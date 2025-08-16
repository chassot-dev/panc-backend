import Panc from '../../../domain/panc/panc.model';
import NomePopular from '../../../domain/panc/nomePopular.model';
import PartesComestiveis from '../../../domain/panc/partesComestiveis.model';
import pancData from './pancs.json';
import { PancCreationAttributes } from '../../../domain/panc/panc.interface';

const seeder = {
  up: async () => {
    for (const data of pancData) {

      const pancCreate: PancCreationAttributes = {
        nome: data.nome,
        img: data.img,
        nome_cientifico: data.nome_cientifico,
        familia_botanica: data.familia_botanica,
        origem: data.origem,
        habito_crescimento: data.habito_crescimento,
        identificacao_botanica: data.identificacao_botanica,
      };

      const panc = await Panc.create(pancCreate);

      // nomes populares
      if (data.nome_popular?.length) {
        await NomePopular.bulkCreate(
          data.nome_popular.map(np => ({ nome: np, id_panc: panc.id })) // transforma string em objeto
        );
      }

      // partes comestíveis
      if (data.partes_comestiveis?.length) {
        await PartesComestiveis.bulkCreate(
          data.partes_comestiveis.map(pc => ({ parte: pc.parte, modo: pc.modo, id_panc: panc.id }))
        );
      }
    }
  },

  down: async () => {
    await PartesComestiveis.destroy({ where: {} });
    await NomePopular.destroy({ where: {} });
    await Panc.destroy({ where: {} });
  }
};

module.exports = seeder;
