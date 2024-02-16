import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TeamsModule } from './teams/teams.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd() ,'src/schema.gql'),
      driver: ApolloDriver,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017', {
      user: 'root',
      pass: 'example',
      dbName: 'task_manager',
    }),
    UsersModule, TasksModule, TeamsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
