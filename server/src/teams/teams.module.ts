import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TeamsService } from './teams.service';
import { TeamsResolver } from './teams.resolver';
import { TeamSchema } from './teams.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
    UsersModule
  ],
  providers: [TeamsService, TeamsResolver],
})
export class TeamsModule {}
