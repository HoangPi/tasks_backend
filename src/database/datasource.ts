import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "../user/entity/user.entity"

export const datasourceOptions: DataSourceOptions = {
    type: 'postgres',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: +process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    entities: [User],
    migrations: [__dirname + "/migrations/*-migrate.*"]
}

const dataSource = new DataSource(datasourceOptions)
export default dataSource