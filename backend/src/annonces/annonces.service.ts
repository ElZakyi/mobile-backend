import { Injectable } from '@nestjs/common';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Annonce } from './entities/annonce.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnoncesService {
  constructor(
    @InjectRepository(Annonce)
    private annonceRepository : Repository<Annonce>
  ){}
  
  async create(createAnnonceDto: CreateAnnonceDto) {
    return await this.annonceRepository.save(createAnnonceDto);
  }

  async findAll() {
    return await this.annonceRepository.find();
  }

  async findOne(id: string) {
    return await this.annonceRepository.findOneBy({id});
  }

  async update(id: string, updateAnnonceDto: UpdateAnnonceDto) {
    return await this.annonceRepository.update(id, updateAnnonceDto);
  }

  async remove(id: string) {
    return await this.annonceRepository.delete(id);
  }
}
