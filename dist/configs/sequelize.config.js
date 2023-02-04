"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = void 0;
const sequelize_1 = require("@nestjs/sequelize");
exports.Sequelize = sequelize_1.SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'nest-course',
    models: [],
    autoLoadModels: true,
});
//# sourceMappingURL=sequelize.config.js.map