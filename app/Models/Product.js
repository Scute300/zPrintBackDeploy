"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Account_1 = __importDefault(require("./Account"));
const Departament_1 = __importDefault(require("./Departament"));
const Marca_1 = __importDefault(require("./Marca"));
class Product extends Orm_1.BaseModel {
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Product.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Product.prototype, "updatedAt", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Product.prototype, "account_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Product.prototype, "marca_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Product.prototype, "departament_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Product.prototype, "product_name", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Product.prototype, "codigo_de_barras", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Product.prototype, "precio", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Product.prototype, "precio_segundo", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Product.prototype, "costo", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Product.prototype, "especificaciones", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Product.prototype, "existencias", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    Orm_1.belongsTo(() => Account_1.default),
    __metadata("design:type", Object)
], Product.prototype, "account", void 0);
__decorate([
    Orm_1.belongsTo(() => Departament_1.default, {
        localKey: 'id',
        foreignKey: 'departament_id'
    }),
    __metadata("design:type", Object)
], Product.prototype, "departament", void 0);
__decorate([
    Orm_1.belongsTo(() => Marca_1.default, {
        localKey: 'id',
        foreignKey: 'marca_id'
    }),
    __metadata("design:type", Object)
], Product.prototype, "marca", void 0);
exports.default = Product;
//# sourceMappingURL=Product.js.map