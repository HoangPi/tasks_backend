import { User } from "../../user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sprint } from "./sprint.entity";

export enum UserStoryStatus {
    READY = "Ready",
    ON_GOING = "On going",
    COMPLETED = "Completed",
    ABORTED = "Aborted"
}

@Entity()
export class UserStory {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @ManyToOne(()=>User, (user) => user.ownedUS)
    owner: User

    @ManyToOne(()=>User, (user) => user.assignedUS)
    assignedTo: User

    @ManyToOne(()=>Sprint, (sprint) => sprint.userStories)
    sprint: Sprint

    @Column({type: 'enum', enum: UserStoryStatus, default: UserStoryStatus.READY})
    status: UserStoryStatus
}