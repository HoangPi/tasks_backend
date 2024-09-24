import { User } from "../../user/entity/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project{
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @ManyToOne(()=>User, (user) => user.ownedProjects)
    projectOwner: User

    @ManyToMany(()=> User, (user) => user.projects)
    members: User[]

    @Column({type: 'text', default: ''})
    description: string
}