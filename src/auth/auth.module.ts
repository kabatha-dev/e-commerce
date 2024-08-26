import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule}  from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports:[UsersModule,
  PassportModule,
JwtModule.register({
  secret:'secretKey',
  signOptions:{expiresIn:'60m'},
}),
],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
