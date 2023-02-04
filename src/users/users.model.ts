import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, DataType, Column, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

export interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Unique ID' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'user@gmail.com', description: 'Email' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({ example: '12345678', description: 'Password' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@ApiProperty({ example: 'true', description: 'User is banned or not' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean;

	@ApiProperty({ example: 'For huligans', description: 'Reason of user ban' })
	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string;

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];

	@HasMany(() => Post)
	posts: Post[];
}

/*
    Чтобы класс стал таблицей в БД нужно передать ему декоратор Table

    allowNull: false - значит не может быть пустым

    UserCreationAttrs в нем будут поля для создания объекта

	@ApiProperty({ example: '1', description: 'Unique ID'}) - example то как это поле должно выглядить, дескрипшен это описание

*/
