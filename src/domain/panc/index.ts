
import Panc from './panc.model';
import NomePopular from './nomePopular.model';
import PartesComestiveis from './partesComestiveis.model';

Panc.hasMany(NomePopular, { foreignKey: 'id_panc', as: 'nome_popular' });
NomePopular.belongsTo(Panc, { foreignKey: 'id_panc', as: 'panc' });

Panc.hasMany(PartesComestiveis, { foreignKey: 'id_panc', as: 'partes_comestiveis' });
PartesComestiveis.belongsTo(Panc, { foreignKey: 'id_panc', as: 'panc' });

export { Panc, NomePopular, PartesComestiveis };
