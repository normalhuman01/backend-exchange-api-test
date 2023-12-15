import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('pwd') password: string, @Res() res: FastifyReply) {
    try {
      const user = await this.authService.validateUser(email, password); 


      if (!user) {
        throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.authService.login(user);
      res.status(HttpStatus.OK).send(token);
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Error en la autenticación', error: error.message });
    }
  }

  @Post('register')
  async register(@Body('email') email: string, @Body('pwd') password: string, @Res() res: FastifyReply) {
    try {
      await this.usersService.registerUser(email, password);
      res.status(HttpStatus.CREATED).send({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: 'Error en el registro', error: error.message });
    }
  }
}
