import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		try {
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
				//мы это делаем для того что бы рефлектор понимал какие данные ему необходимо доставать
				context.getHandler(),
				context.getClass(),
			]);
			if (requiredRoles) return true;
			const authHeader = req.headers.authorization;
			const bearer = authHeader.split('')[0];
			const token = authHeader.split('')[1];
			if (bearer !== 'Bearer' || !token)
				throw new UnauthorizedException({ message: 'User not authorized' });
			//раскодируем токен
			const user = this.jwtService.verify(token);
			req.user = user;
			// проверяем есть ли у пользователя необходимая для данного ендпоинта роль
			return user.roles.some(role => requiredRoles.includes(role.value));
		} catch (err) {
			throw new HttpException(`No access to this role`, HttpStatus.FORBIDDEN);
		}
	}
}
