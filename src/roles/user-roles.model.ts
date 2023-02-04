import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Role } from './roles.model';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleId: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;
}

/* ForeignKey(() => Role) - нужен для того что бы sequelize понимал что это внешний ключ, внутри указываем на что этот ключ ссылается */
