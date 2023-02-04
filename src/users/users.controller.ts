import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.userService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Get users' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN') //каким ролям будет доступен этот ендпоинт
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.userService.getAllUsers();
	}

	//админ сможем выдавать роль
	@ApiOperation({ summary: 'Set role' })
	@ApiResponse({ status: 200 })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN') //каким ролям будет доступен этот ендпоинт
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.userService.addRole(dto);
	}

	//админ сможет банить пользователей
	@ApiOperation({ summary: 'Ban user' })
	@ApiResponse({ status: 200 })
	@UseGuards(JwtAuthGuard)
	@Roles('ADMIN') //каким ролям будет доступен этот ендпоинт
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanUserDto) {
		return this.userService.ban(dto);
	}
}
