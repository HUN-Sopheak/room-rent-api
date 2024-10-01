import { AppDataSource } from '../../config/typeorm.config';
import UserSeeder from './user.seeder';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('DataSource initialized.');

    // Manually run each seeder concurrently
    const userSeeder = new UserSeeder();

    await Promise.all([
      userSeeder.run(AppDataSource),
    ]);
    console.clear();
    console.log('All seeding completed successfully.');
  } catch (error) {
    console.clear();
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();
