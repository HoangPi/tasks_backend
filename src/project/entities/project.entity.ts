import { UserStory } from "./user-story.entity";
import { User } from "../../user/entity/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sprint } from "./sprint.entity";

export enum ProjectStatus{
    ON_GOING= 'On going',
    COMPLETED= 'Completed',
    ABORTED= 'Aborted'
}

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

    @Column({type: 'enum', enum: ProjectStatus, default: ProjectStatus.ON_GOING})
    status: ProjectStatus

    @OneToMany(()=>Sprint, (sprint)=>sprint.project)
    sprints: Sprint[]
}