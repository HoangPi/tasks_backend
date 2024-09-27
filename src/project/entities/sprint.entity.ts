import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserStory } from "./user-story.entity";
import { Project } from "./project.entity";

export enum SprintStatus{
    READY = "Ready",
    ON_GOING = "On going",
    COMPLETED = "Completed",
    ABORTED = "Aborted"
}

@Entity()
export class Sprint{
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    name: string

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP + INTERVAL '14 days'"})
    endAt: Date

    @OneToMany(()=>UserStory, (us) => us.sprint)
    userStories: UserStory[]

    @ManyToOne(()=>Project, (project) => project.sprints)
    project: Project

    @Column({type: 'enum', enum: SprintStatus, default: SprintStatus.READY})
    status: SprintStatus
}