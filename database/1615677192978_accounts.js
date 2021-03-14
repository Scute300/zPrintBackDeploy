"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Accounts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'accounts';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('store_name').notNullable();
            table.string('password').notNullable();
            table.string('email').unique().notNullable();
            table.string('name').notNullable();
            table.timestamps(true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Accounts;
//# sourceMappingURL=1615677192978_accounts.js.map