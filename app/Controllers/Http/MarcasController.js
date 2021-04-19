"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Marca_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Marca"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class MarcasController {
    async registrarMarca({ request, auth, response }) {
        const validation = await Validator_1.schema.create({
            nombre: Validator_1.schema.string({}, [
                Validator_1.rules.required()
            ])
        });
        const messages = {
            "required": "Es necesario llenar el campo del nombre",
        };
        const validate = await request.validate({
            schema: validation,
            messages: messages
        });
        const marca = new Marca_1.default();
        marca.account_id = auth.user.id;
        marca.name = validate.nombre;
        await marca.save();
        return response.json({
            status: 'sure',
            message: 'Registrado',
            data: marca
        });
    }
    async eliminarMarca({ params, auth, response }) {
        const marca = await Marca_1.default.findBy('id', params.id);
        if (marca == null) {
            return response.status(404).json({
                status: 'Not found',
                message: 'Este producto ya ha sido eliminado'
            });
        }
        if (marca.account_id == auth.user.id) {
            await marca.delete();
        }
    }
}
exports.default = MarcasController;
//# sourceMappingURL=MarcasController.js.map