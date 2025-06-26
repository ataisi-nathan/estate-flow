import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: { email: string; password: string; role: string; tenantId: string }) {
    return this.authService.register(body);
  }
}
