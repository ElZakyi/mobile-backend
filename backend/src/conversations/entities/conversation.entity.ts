import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "../../messages/entities/message.entity";
import { User } from "../../users/entities/user.entity";
@Entity()
export class Conversation {
    @PrimaryGeneratedColumn('uuid')
    id : string
    @OneToMany(() => Message, (message) => message.conversation)
    message: Message[]
    @ManyToOne(()=> User)
    acheteur: User
    @ManyToOne(()=> User)
    vendeur: User
    @CreateDateColumn()
    createdAt: Date
}
