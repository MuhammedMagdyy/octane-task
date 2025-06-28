import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtPayload } from 'src/common/interfaces/jwt.interface';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, name, password } = registerDto;
    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const saltRounds = await genSalt();
    const hashedPassword = await hash(password, saltRounds);

    const user = await this.usersRepository.save({
      email,
      name,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token: this.generateJwtToken({ id: user.id }),
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'User Logged in successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token: this.generateJwtToken({ id: user.id }),
      },
    };
  }

  private generateJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
