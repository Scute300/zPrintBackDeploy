"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
module.exports = {
    name: Env_1.default.get('CLOUDINARY_NAME', ''),
    api_key: Env_1.default.get('CLOUDINARY_API_KEY', ''),
    api_secret: Env_1.default.get('CLOUDINARY_API_SECRET', '')
};
//# sourceMappingURL=cloudinary.js.map