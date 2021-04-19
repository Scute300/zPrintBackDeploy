"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Product"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Departament_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Departament"));
const Marca_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Marca"));
class ProductsController {
    async agregarProducto({ auth, request, response }) {
        const vRules = Validator_1.schema.create({
            marca_id: Validator_1.schema.string({}, [
                Validator_1.rules.required()
            ]),
            departament_id: Validator_1.schema.string({}, [
                Validator_1.rules.required()
            ]),
            product_name: Validator_1.schema.string({}, [
                Validator_1.rules.required(),
            ]),
            codigo_de_barras: Validator_1.schema.number([
                Validator_1.rules.unsigned(),
                Validator_1.rules.required()
            ]),
            precio1: Validator_1.schema.number([
                Validator_1.rules.unsigned(),
                Validator_1.rules.required()
            ]),
            precio2: Validator_1.schema.number([
                Validator_1.rules.unsigned(),
                Validator_1.rules.required()
            ]),
            costo: Validator_1.schema.number([
                Validator_1.rules.unsigned(),
                Validator_1.rules.required()
            ]),
            especificaciones: Validator_1.schema.string({}, [
                Validator_1.rules.required()
            ]),
            existencia: Validator_1.schema.number([
                Validator_1.rules.unsigned(),
                Validator_1.rules.required()
            ]),
        });
        const messages = {
            "required": "Es necesario llenar todos los campos",
        };
        const validate = await request.validate({
            schema: vRules,
            messages: messages
        });
        const departament = await Departament_1.default.query()
            .where('account_id', auth.user?.id)
            .where('name', validate.departament_id)
            .first();
        const marca = await Marca_1.default.query()
            .where('account_id', auth.user?.id)
            .where('name', validate.marca_id)
            .first();
        const product = new Product_1.default();
        product.product_name = validate.product_name;
        product.marca_id = marca.id;
        product.departament_id = departament.id;
        product.account_id = auth.user.id;
        product.codigo_de_barras = validate.codigo_de_barras;
        product.precio = validate.precio1;
        product.precio_segundo = validate.precio2;
        product.costo = validate.costo;
        product.especificaciones = validate.especificaciones;
        product.existencias = validate.existencia;
        await product.save();
        return response.json({
            status: 'sure',
            data: 'Nuevo producto agregado'
        });
    }
    async getProducts({ auth, response, params }) {
        const products = await Product_1.default.query()
            .where('account_id', auth.user.id)
            .preload('marca')
            .preload('departament');
        return response.json({
            status: 'sure',
            data: products
        });
    }
    async marcasydepartamentos({ response, auth }) {
        const marcas = await Marca_1.default.query()
            .where('account_id', auth.user.id);
        const departaments = await Departament_1.default.query()
            .where('account_id', auth.user.id);
        return response.json({
            status: 'sure',
            marcas: marcas,
            departaments: departaments
        });
    }
}
exports.default = ProductsController;
//# sourceMappingURL=ProductsController.js.map