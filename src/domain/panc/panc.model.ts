import { Model, DataTypes } from 'sequelize';
<<<<<<< HEAD:src/models/panc.model.ts
import { sequelize } from '../db/connection';
import { PancAttributes, PancCreationAttributes } from '../interfaces/panc.interface';
=======
import { PancAttributes, PancCreationAttributes } from './panc.interface';
import { sequelize } from '../../resources/db/connection';
>>>>>>> 5822c31c8f9046dfe2945c958ffa9e3ef1fb30ee:src/domain/panc/panc.model.ts
import NomePopular from './nomePopular.model';

class Panc extends Model<PancAttributes, PancCreationAttributes>
  implements PancAttributes {
  public id!: number;
  public nome_cientifico!: string;
  public familia_botanica!: string;
  public origem!: string;
  public habito_crescimento!: string;
  public identificacao_botanica!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Panc.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_cientifico: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    familia_botanica: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    origem: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    habito_crescimento: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    identificacao_botanica: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'pancs',
    sequelize,
    timestamps: false,
  }
);

export default Panc;
