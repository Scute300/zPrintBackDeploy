"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Account_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Account"));
const PasswordRecuperation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PasswordRecuperation"));
const randomstring_1 = __importDefault(require("randomstring"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mammonzprint@gmail.com',
        pass: 'tyutyu321'
    }
});
class AccountsController {
    async newAccount({ auth, request, response }) {
        const userValidation = await Validator_1.schema.create({
            store_name: Validator_1.schema.string({}, [
                Validator_1.rules.alpha({
                    allow: ['space']
                }),
                Validator_1.rules.maxLength(20),
                Validator_1.rules.minLength(5),
                Validator_1.rules.required()
            ]),
            email: Validator_1.schema.string({}, [
                Validator_1.rules.email(),
                Validator_1.rules.required(),
                Validator_1.rules.unique({
                    table: 'accounts',
                    column: 'email',
                })
            ]),
            name: Validator_1.schema.string({}, [
                Validator_1.rules.alpha(),
                Validator_1.rules.maxLength(25),
                Validator_1.rules.minLength(4),
                Validator_1.rules.required()
            ]),
            password: Validator_1.schema.string({}, [
                Validator_1.rules.maxLength(30),
                Validator_1.rules.minLength(8),
                Validator_1.rules.confirmed('password_confirmation'),
                Validator_1.rules.required(),
            ]),
            password_confirmation: Validator_1.schema.string({}, [
                Validator_1.rules.confirmed('password')
            ])
        });
        const messages = {
            "required": "Porfavor llena todos los campos correctamente",
            "store_name.alpha": "Nombre de la cuenta no puede contener numeros o caracteres especiales",
            "store_name.maxLength": "Nombre de la cuenta no puede ser mayor a 20 caracteres",
            "store_name.minLength": "Nombre de la cuenta no puede ser menor a 5 caracteres",
            "email": "Por favor, introduce una dirección de correo valida",
            "name.minLength": "Nombre no debe ser menor a 4 caracteres",
            "name.maxLength": "Nombre no debe ser mayor a 25 caracteres",
            "password.minLength": "Contraseña no debe ser menor a 8 caracteres",
            "password.maxLength": "Contraseña no puede ser mayor a 30 caracteres",
            "confirmed": "Las contraseñas no coinciden",
            "unique": "Esta dirección de email ya está registrada"
        };
        const validate = await request.validate({
            schema: userValidation,
            messages: messages
        });
        const account = new Account_1.default();
        for (const key in validate) {
            account[key] = validate[key];
        }
        await account.save();
        const token = await auth.attempt(validate.email, validate.password);
        return response.json({
            status: 'sure',
            data: token
        });
    }
    async login({ auth, request, response }) {
        const newSchema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [
                Validator_1.rules.email(),
                Validator_1.rules.required()
            ]),
            password: Validator_1.schema.string({}, [
                Validator_1.rules.maxLength(30),
                Validator_1.rules.minLength(8),
                Validator_1.rules.required(),
            ])
        });
        const validate = await request.validate({
            schema: newSchema,
            messages: {
                "required": "Porfavor, rellena los datos correctamente"
            }
        });
        try {
            const token = await auth.attempt(validate.email, validate.password);
            return response.json({
                status: 'sure',
                data: token
            });
        }
        catch (error) {
            return response.status(401).json({
                status: 'wrong',
                message: 'Email o Contraseña incorrectos'
            });
        }
    }
    async requestNewPassword({ request, response }) {
        const newSchema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [
                Validator_1.rules.email(),
                Validator_1.rules.required()
            ])
        });
        const validate = await request.validate({
            schema: newSchema,
            messages: {
                "required": "Porfavor, rellena los datos correctamente"
            }
        });
        const findAccount = await Account_1.default.findBy('email', validate.email);
        if (findAccount == null) {
            return response.status(401).json({
                status: 'wrong',
                message: 'Esta dirección de correo no pertenece a ninguna cuenta'
            });
        }
        let codeId = randomstring_1.default.generate({
            length: 12,
            charset: 'hex'
        });
        let findCodeId = await PasswordRecuperation_1.default.findBy('request_random_id', codeId);
        while (findCodeId !== null) {
            codeId = randomstring_1.default.generate({
                length: 12,
                charset: 'hex'
            });
            findCodeId = await PasswordRecuperation_1.default.findBy('request_random_id', codeId);
        }
        findCodeId = await PasswordRecuperation_1.default.findBy('account_id', findAccount.id);
        if (findCodeId !== null) {
            await findCodeId.delete();
        }
        const newRequestRecuperation = new PasswordRecuperation_1.default();
        newRequestRecuperation.account_id = findAccount.id;
        newRequestRecuperation.request_random_id = codeId;
        await newRequestRecuperation.save();
        const mailOptions = {
            from: 'mammonzprint@gmail.com',
            to: validate.email,
            subject: 'Recuperación de contraseña',
            text: `Recupere su contraseña en http://zprint.herokuapp.com/NuevaContrasena?code=${codeId}`
        };
        mail.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ');
            }
        });
        return response.json({
            status: 'sure',
            data: 'Hemos enviado instrucciones a su dirección de email para ayudarle a recuperar su contraseña'
        });
    }
    async reestablecerPassword({ params, response }) {
        const findCode = await PasswordRecuperation_1.default.findBy('request_random_id', params.code);
        if (findCode == null) {
            return response.status(404).json({
                status: 'not found',
                message: 'Lo sentimos este vinculo ha caducado'
            });
        }
        const codeId = randomstring_1.default.generate({
            length: 8,
            charset: 'hex'
        });
        const user = await Account_1.default.findBy('id', findCode.account_id);
        user.password = codeId;
        await user.save();
        const mailOptions = {
            from: 'mammonzprint@gmail.com',
            to: user.email,
            subject: 'Su nueva contraseña',
            text: `Su contraseña para acceder a los servicios de mammon es: ${codeId}`
        };
        mail.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ');
            }
        });
        return response.json({
            status: 'sure',
            data: 'Su nueva contraseña ha sido enviada por email'
        });
    }
}
exports.default = AccountsController;
//# sourceMappingURL=AccountsController.js.map