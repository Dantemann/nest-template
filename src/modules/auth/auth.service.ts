import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { User } from './entities';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces';




@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto) {
        const { password, ...userData } = createUserDto;
        const user = this.userRepository.create({...userData, password: bcrypt.hashSync(password, 10)});
        await this.userRepository.save(user);

        delete user.password;
        return {...user, token: this.getJwt({id: user.id})};
    }

    async login(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;
        throw new UnauthorizedException("Credentials are not valid", {cause: Error("causa"), description: "desc"});
        const user = await this.userRepository.findOne({where: {email}, select: {email: true, password: true, id: true}});
        if(!user || !bcrypt.compareSync(password, user.password) ) throw new UnauthorizedException("Credentials are not valid");

        delete user.password;

        return {...user, token: this.getJwt({id: user.id})};
    }

    private getJwt(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }
}
