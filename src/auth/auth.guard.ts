import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) {} 

  getSecretKeyJWT(): string {
    return this.configService.get<string>('SECRET_JWT');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> { 

    const request = context.switchToHttp().getRequest(); 

    const token = this.extractTokenFromHeader(request); 

    console.log(token)

    if (!token) {
      throw new UnauthorizedException();
    }
    try { 

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.getSecretKeyJWT(),
      }); 

      request['user'] = payload;
    } catch (error) { 
      console.log(error)
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}