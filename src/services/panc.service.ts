import Panc from '../domain/panc/panc.model';
import NomePopular from '../domain/panc/nomePopular.model';
import PartesComestiveis from '../domain/panc/partesComestiveis.model';
import { BadRequestError, DuplicatedError, NotFoundError } from '../exceptions/errors';

class PancService {

  async delete(id: number): Promise<boolean> {
    const deletedCount = await Panc.destroy({
      where: { id }
    });

    return deletedCount > 0;
  }

  async create(data: {
    nome: string;
    img: string;
    nome_cientifico: string;
    familia_botanica: string;
    origem: string;
    habito_crescimento: string;
    identificacao_botanica: string;
    nome_popular?: { nome: string }[];
    partes_comestiveis?: { parte: string; modo: string }[];
  }): Promise<Panc> {

    const existingPanc = await Panc.findOne({ where: { nome_cientifico: data.nome_cientifico } });
    if (existingPanc) throw new DuplicatedError('Panc já cadastrada com este nome científico.');

    const panc = await Panc.create(data);

    if (data.nome_popular?.length) {
      await NomePopular.bulkCreate(
        data.nome_popular.map(np => ({ ...np, id_panc: panc.id }))
      );
    }

    if (data.partes_comestiveis?.length) {
      await PartesComestiveis.bulkCreate(
        data.partes_comestiveis.map(pc => ({ ...pc, id_panc: panc.id }))
      );
    }

    return panc;
  }

  async update(
    id: number,
    data: Partial<{
      nome: string,
      img: string,
      nome_cientifico: string;
      familia_botanica: string;
      origem: string;
      habito_crescimento: string;
      identificacao_botanica: string;
      nome_popular?: { id?: number; nome: string }[];
      partes_comestiveis?: { id?: number; parte: string; modo: string }[];
    }>
  ): Promise<Panc> {

    const panc = await Panc.findByPk(id, { include: ['nome_popular', 'partes_comestiveis'] });
    if (!panc) throw new NotFoundError('Panc não encontrada.');

    await panc.update(data);

    if (data.nome_popular?.length) {
      await NomePopular.bulkCreate(
        data.nome_popular.map(np => ({ ...np, id_panc: id })),
        { updateOnDuplicate: ['nome'] }
      );
    }

    if (data.partes_comestiveis?.length) {
      await PartesComestiveis.bulkCreate(
        data.partes_comestiveis.map(pc => ({ ...pc, id_panc: id })),
        { updateOnDuplicate: ['parte', 'modo'] }
      );
    }

    return panc;
  }

  async findByName(name: string): Promise<Panc> {
    if (!name) throw new BadRequestError('Informe o nome');

    const panc = await Panc.findOne({
      where: {
        nome_cientifico: name
      },
      include: ['nome_popular', 'partes_comestiveis']
    });

    if (!panc) throw new NotFoundError('Panc não encontrada.');

    return panc;
  }

  async findById(id: number): Promise<Panc> {
    if (!id) throw new BadRequestError('Informe o id');

    const panc = await Panc.findByPk(id, { include: ['nome_popular', 'partes_comestiveis'] });
    if (!panc) throw new NotFoundError('Panc não encontrada.');

    return panc;
  }

  async getAll(): Promise<Panc[]> {
    const pancs = await Panc.findAll({ include: ['nome_popular', 'partes_comestiveis'] });
    if (!pancs.length) throw new NotFoundError('Nenhuma Panc encontrada.');
    return pancs;
  }

}

export default new PancService();