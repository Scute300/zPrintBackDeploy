"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.post('/register', 'AccountsController.newAccount');
Route_1.default.post('/login', 'AccountsController.login');
Route_1.default.post('/newPasswordRequest', 'AccountsController.requestNewPassword');
Route_1.default.get('/newPassword/:code', 'AccountsController.reestablecerPassword');
Route_1.default.group(() => {
    Route_1.default.post('/newMarca', 'MarcasController.registrarMarca');
    Route_1.default.post('/newDepartamento', 'DepartamentsController.registrarDepartamento');
    Route_1.default.get('/marcasydepartamentos', 'ProductsController.marcasydepartamentos');
    Route_1.default.delete('/eliminarDepartamento/:id', 'DepartamentsController.eliminardeparamento');
    Route_1.default.delete('/eliminarMarca/:id', 'MarcasController.eliminarMarca');
    Route_1.default.post('/newProduct', 'ProductsController.agregarProducto');
    Route_1.default.get('/getProducts', 'ProductsController.getProducts');
}).prefix('api').middleware('auth');
//# sourceMappingURL=routes.js.map