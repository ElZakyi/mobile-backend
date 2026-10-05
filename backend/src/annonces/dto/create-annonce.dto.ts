import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateAnnonceDto {
    @IsString()
    name : string
    @IsString()
    ville : string
    @IsNumber()
    prix : number
    @IsOptional() @IsString()
    photo?:string
}
