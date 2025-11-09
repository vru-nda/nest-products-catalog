import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);

  // Admin user data
  const adminUser = {
    email: 'admin@example.com',
    password: 'Admin@123',
    name: 'Admin User',
  };

  try {
    // Check if admin already exists
    const existingAdmin = await usersService.findByEmail(adminUser.email);

    if (existingAdmin) {
      console.log('Admin user already exists');
    } else {
      const newAdmin = await usersService.create(adminUser);
      console.log('Admin user created successfully:', {
        id: newAdmin.id,
        email: newAdmin.email,
        name: newAdmin.name,
      });
    }
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap();
