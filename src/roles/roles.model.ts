import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Unique ID' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({ example: 'ADMIN', description: 'Unique user role value' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string;

	@ApiProperty({ example: 'Administrator', description: 'Role description' })
	@Column({ type: DataType.STRING, allowNull: false })
	description: string;

	@BelongsToMany(() => User, () => UserRoles)
	users: User[];
}

/* У roles и user связь будет many to many. Что бы это реализовать нам нужно создать Промежуточную таблицу и в ней указать какой пользователь обладает какими ролями
    @BelongsToMany(() => User, () => UserRoles) - мы указываем с какой сущностью мы связываем и через какую таблицу       
*/
