import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
	@IsString({ message: `String required` })
	readonly value: string; //значение роли
	@IsNumber({}, { message: 'Number required' })
	readonly userId: number; //айди пользоватля которому мы эту роль будем добавлять
}
