import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UserType } from 'src/users/enums/user-type.enum';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class SeedersService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const adminCount = await this.usersService.calculateAdminCount();

    if (adminCount === 0) {
      this.logger.log('❌ No admins found. Creating admin...');

      const saltRounds = await genSalt();
      const adminUser = {
        name: this.configService.get<string>('ADMIN_NAME'),
        email: this.configService.get<string>('ADMIN_EMAIL'),
        password: await hash(
          this.configService.get<string>('ADMIN_PASSWORD'),
          saltRounds,
        ),
        userType: UserType.ADMIN,
      };

      await this.usersRepository.save(adminUser);

      this.logger.log('✅ Admin user created successfully.');
    } else {
      this.logger.log('⚠️  Admin user already exists.');
    }
  }
}
