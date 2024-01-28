import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';

type typesUser = 'user' | 'admin' | 'editor';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userType: typesUser[],
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Please provide token');
      }

      const { sub: user }: { sub: UserEntity } = this.jwtService.verify(token, {
        secret: process.env.PUBLIC_KEY,
      });
      if (this.userType.includes('admin')) {
        if (user.id_type.id === 1) {
          return true;
        }
      }
      if (this.userType.includes('user')) {
        if (user.id_type.id === 6) {
          return true;
        }
      }
      if (this.userType.includes('editor')) {
        if (user.id_type.id === 4) {
          return true;
        }
      }

      throw new HttpException(
        "You haven't access for this request",
        HttpStatus.NOT_ACCEPTABLE,
      );
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'Session expired! Please Sign-in',
      );
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
