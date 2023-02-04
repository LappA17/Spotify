import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User,
		private readonly roleService: RolesService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleByValue('ADMIN'); // по умолчанию будем присваивать эту роль
		//теперь нам нужно указать что эта роль принадлежит пользователю
		//метод @set перезаписывает какое-то поле и сразу обновляет его в БД
		//так как изначально у пользователя нет ролей мы указываем массив в который добавляем один айди из роли
		await user.$set('roles', [role.id]);
		//фция set добавляет роль в базу данных, но у самого пользователя этой роли нет
		user.roles = [role];
		return user;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
		return user;
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId); //find by prrimary key
		const role = await this.roleService.getRoleByValue(dto.value);
		if (role && user) {
			//с помощью $set мы эти роли проинициализировали, то с помощью add мы уже проинициализированные роли
			//к нашему массиву добавили еще одно значение
			await user.$add('role', role.id);
			return dto;
		}
		//если условие выше не выполнилось то либо роль не нашлась либо пользователь
		throw new HttpException(`User or role is not found`, HttpStatus.NOT_FOUND);
	}

	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		if (!user) throw new HttpException(`User Not found`, HttpStatus.NOT_FOUND);
		user.banned = true;
		user.banReason = dto.banReason;
		await user.save();
		return user;
	}
}

/* include: { all: true } - что бы все поля с которыми хоть как-то связан Пользователь к нам подтягивались */
