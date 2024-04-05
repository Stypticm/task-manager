import { Module } from '@nestjs/common';
import { ProjectSchema } from './projects.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
        UsersModule
    ],
    providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}
