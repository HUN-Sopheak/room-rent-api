import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app/app.module';
import { HelpersService } from 'src/utils/helper/helpers.service';
import { DataSource } from 'typeorm';
import { Seeder} from 'typeorm-extension';
import { User } from '../../modules/user/entities/user.entity';
import * as moment from 'moment';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    try {
      const app = await NestFactory.createApplicationContext(AppModule);
      const helper = app.get(HelpersService);  
      
      await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');
      const userRepository = dataSource.getRepository(User);

      const hashedPassword = await helper.hashPassword('$super@168$');
      const date = moment().format('YYYY-MM-DD HH:mm:ss')
      
      const user = new User();
      user.name = 'super';
      user.password = hashedPassword;
      user.email = 'super@168.com';
      user.username = 'super';
      user.createdAt = new Date(date);
      user.updatedAt = new Date(date);

      
      await userRepository.save(user);
      
      await app.close();  
    } catch (error) {
      console.clear();
      console.error('Error while seeding User data:', error);
    }
  }
}
