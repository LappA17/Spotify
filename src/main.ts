import { ValidationPipe } from 'src/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function start() {
	const PORT = process.env.PORT || 8000;
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Lesson for advanced Backend')
		.setDescription('Documentation REST API')
		.setVersion('1.0.0')
		.addTag('Ruslan')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);
	//app.useGlobalGuards(JwtAuthGuard); что бы не навешивать декоратор UseGuard над какими-то запросами а сразу помететь все
	app.useGlobalPipes(new ValidationPipe()); //чтобы не навешивать а отрабатывало для каждого ендпоинта

	await app.listen(PORT, () => console.log('Server started on the PORT ' + PORT));
}
start();

/*
	builder - это такой паттерн который позволяет постепено задавать для объекта какие-то поля
 */
