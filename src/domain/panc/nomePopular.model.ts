import { Model, DataTypes } from 'sequelize';
import Panc from './panc.model';
<<<<<<< HEAD:src/models/nomePopular.model.ts
import { NomePopularAttributes, NomePopularCreationAttributes } from '../interfaces/nomePopular.interface';
=======
import { NomePopularAttributes, NomePopularCreationAttributes } from './nomePopular.interface';
import { sequelize } from '../../resources/db/connection';
>>>>>>> 5822c31c8f9046dfe2945c958ffa9e3ef1fb30ee:src/domain/panc/nomePopular.model.ts

class NomePopular extends Model<NomePopularAttributes, NomePopularCreationAttributes>
  implements NomePopularAttributes {
  public id!: number;
  public nome!: string;
  public id_panc!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializa o model
NomePopular.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    id_panc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'nome_popular',
    sequelize,
    timestamps: false,
  }
);

NomePopular.belongsTo(Panc, { foreignKey: 'id_panc', as: 'panc' });

export default NomePopular;
