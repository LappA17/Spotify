import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
		const obj = plainToClass(metadata.metatype, value);
		const errors = await validate(obj);

		if (errors.length) {
			let messages = errors.map(err => {
				return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
			});
			throw new ValidationException(messages);
		}
		return value;
	}
}

/* Pipe делают две вещи:
1. преобразовывают входные данные(например строку переводить в число)
2. валидация входных данных

plainToClass(metadata.metatype) - получаем объект который мы будем валидировать
const errors = validate(obj) - здесь будут ошибки после валидации полученного объекта выше
*/
