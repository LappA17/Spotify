"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_pipe_1 = require("./pipes/validation.pipe");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function start() {
    const PORT = process.env.PORT || 8000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lesson for advanced Backend')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .addTag('Ruslan')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/docs', app, document);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    await app.listen(PORT, () => console.log('Server started on the PORT ' + PORT));
}
start();
//# sourceMappingURL=main.js.map