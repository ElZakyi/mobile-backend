import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('annonces')
export class Annonce {
    @ManyToOne(()=>User)
    author : User
    @PrimaryGeneratedColumn('uuid')
    id : string
    @Column()
    name : string
    @Column()
    prix : number
    @Column()
    ville : string
    @Column({nullable: true})
    photo : string
    @CreateDateColumn()
    createdAt : Date
}
