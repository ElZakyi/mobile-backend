import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "../../conversations/entities/conversation.entity";
import { User } from "../../users/entities/user.entity";
@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @ManyToOne(()=> Conversation)
    conversation: Conversation
    @ManyToOne(()=> User)
    auth: User
    @Column()
    text: string
    @CreateDateColumn()
    createdAt: Date

}
