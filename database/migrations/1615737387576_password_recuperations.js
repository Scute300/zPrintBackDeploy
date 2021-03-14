"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class PasswordRecuperations extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'password_recuperations';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('account_id').unsigned().notNullable().references('id').inTable('accounts').onDelete('CASCADE');
            table.string('request_random_id').notNullable();
            table.timestamps(true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = PasswordRecuperations;
//# sourceMappingURL=1615737387576_password_recuperations.js.map