import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from './entities';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: 
  [AuthService, 
    JwtStrategy
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "2h" }
      })
    }),
  ],
  exports: [
    TypeOrmModule, 
    JwtModule, 
    PassportModule, 
    JwtModule
  ]
})
export class AuthModule {}
