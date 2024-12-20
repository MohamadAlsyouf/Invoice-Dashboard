import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDtoSchema, LoginDto } from './dto/login.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(new ZodValidationPipe(loginDtoSchema)) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
