import { Project } from "../../project/entities/project.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ default: null })
    name: string;

    @Column({ default: null })
    phone: string;

    @Column({ default: null })
    address: string

    @OneToMany(()=> Project, (project) => project.projectOwner)
    ownedProjects: Project[]

    @ManyToMany(()=>Project, (project) => project.members)
    @JoinTable()
    projects: Project[]
}