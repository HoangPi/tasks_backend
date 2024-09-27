import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "../user/entity/user.entity"
import { Project } from "../project/entities/project.entity"
import { UserStory } from "../project/entities/user-story.entity"
import { Sprint } from "../project/entities/sprint.entity"
import { SprintSubscriber } from "../project/entities/subscribers/sprint.subscriber"

export const datasourceOptions: DataSourceOptions = {
    type: 'postgres',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: +process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    entities: [User, Project, UserStory, Sprint],
    migrations: [__dirname + "/migrations/*-migrate.*"],
    subscribers: [SprintSubscriber]
}

const dataSource = new DataSource(datasourceOptions)
export default dataSource