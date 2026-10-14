import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Annonce } from './entities/annonce.entity';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class AnnoncesService {
  constructor(
    @InjectRepository(Annonce)
    private annonceRepository : Repository<Annonce>
  ){}
  
  async create(createAnnonceDto: CreateAnnonceDto, userId: string) {
    return await this.annonceRepository.save({...createAnnonceDto, author : {id : userId}});
  }

  async findAll() {
    return await this.annonceRepository.find({
      order : {createdAt: 'DESC'}
    });
  }

  async findOne(id: string) {
  return await this.annonceRepository.findOne({
    where: {id},
    relations: {author: true}
  });
}
  async findByAuth(idUser: string){
    return await this.annonceRepository.find({
      where : {author : {id : idUser}},
      order : {createdAt : 'DESC'}
    });
  }
  async update(id: string, updateAnnonceDto: UpdateAnnonceDto) {
    return await this.annonceRepository.update(id, updateAnnonceDto);
  }

  async remove(userId: string, idAnnonce: string) {
    const annonce = await this.annonceRepository.findOne({where: {id : idAnnonce}, relations:{author: true}})
    if(userId !== annonce?.author.id){
      throw new ForbiddenException("Vous n'etes pas l'autheur de cette annonce");
    }
    return await this.annonceRepository.delete(idAnnonce);
  }
  async uploadFile(file: Express.Multer.File) {
    const b64 = file.buffer.toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL);
    const result = await cloudinary.uploader.upload(dataURI);

    return { url: result.secure_url };
  }
}
