import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Post } from 'src/posts/posts.model';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		SequelizeModule.forFeature([User, Role, UserRoles, Post]),
		RolesModule,
		forwardRef(() => AuthModule),
	],
	exports: [UsersService],
})
export class UsersModule {}

/* У нас получилась кольцевая зависимость: мы модель авторизации используем внутри модуля Юзера, а модель Юзера внутри модуля авторизация
	Что бы этой ошибки не было нам нужно написать forwardRef(() => AuthModule) */
