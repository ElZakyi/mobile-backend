import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('annonces')
export class Annonce {
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
}
