import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AnnoncesService } from './annonces.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('annonces')
export class AnnoncesController {
  constructor(private readonly annoncesService: AnnoncesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createAnnonceDto: CreateAnnonceDto, @Req() req : any) {
    return this.annoncesService.create(createAnnonceDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.annoncesService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findByAuthor(@Req() req : any){
    return this.annoncesService.findByAuth(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.annoncesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateAnnonceDto: UpdateAnnonceDto) {
    return this.annoncesService.update(id, updateAnnonceDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req : any, @Param('id') idAnnonce: string) {
    return this.annoncesService.remove(req.user.userId , idAnnonce);
  }
}
