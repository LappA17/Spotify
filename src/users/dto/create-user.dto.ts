import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'user@gmail.com', description: 'email' })
	@IsString({ message: `Email is always string` })
	@IsEmail({}, { message: `Not correct email` })
	readonly email: string;

	@ApiProperty({ example: '12345678', description: 'Password' })
	@IsString({ message: `Password is always string` })
	@Length(4, 16, { message: 'Not less then 4 and much then 16' })
	readonly password: string;
}
/*
  DTO нужны для обмена данными между системами, к примеру Клиент и Сервер
 */
