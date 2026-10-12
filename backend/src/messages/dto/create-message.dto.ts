import { IsString, IsUUID } from "class-validator";

export class CreateMessageDto {
    @IsUUID()
    conversationId: string
    @IsString()
    text: string
}
