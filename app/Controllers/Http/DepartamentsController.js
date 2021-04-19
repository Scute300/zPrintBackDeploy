"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Departament_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Departament"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class DepartamentsController {
    async registrarDepartamento({ request, auth, response }) {
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
        const departamento = new Departament_1.default();
        departamento.account_id = auth.user.id;
        departamento.name = validate.nombre;
        await departamento.save();
        return response.json({
            status: 'sure',
            message: 'registrado',
            data: departamento
        });
    }
    async eliminardeparamento({ params, auth, response }) {
        const deparamento = await Departament_1.default.findBy('id', params.id);
        if (deparamento == null) {
            return response.status(404).json({
                status: 'Not found',
                message: 'Este producto ya ha sido eliminado'
            });
        }
        if (deparamento.account_id == auth.user.id) {
            await deparamento.delete();
        }
    }
}
exports.default = DepartamentsController;
//# sourceMappingURL=DepartamentsController.js.map