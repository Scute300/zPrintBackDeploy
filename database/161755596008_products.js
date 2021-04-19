"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Products extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'products';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('account_id').notNullable().unsigned().references('id').inTable('accounts').onDelete('CASCADE');
            table.integer('marca_id').notNullable().unsigned().references('id').inTable('marcas').onDelete('CASCADE');
            table.integer('departament_id').notNullable().unsigned().references('id').inTable('departaments').onDelete('CASCADE');
            table.string('product_name');
            table.integer('codigo_de_barras');
            table.float('precio');
            table.float('precio_segundo');
            table.float('costo');
            table.string('image');
            table.text('especificaciones');
            table.integer('existencias').notNullable().defaultTo(0);
            table.timestamps(true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Products;
//# sourceMappingURL=161755596008_products.js.map