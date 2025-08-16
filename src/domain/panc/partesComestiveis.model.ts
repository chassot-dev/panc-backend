import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../resources/db/connection';
import Panc from './panc.model';
import { PartesComestiveisAttributes, PartesComestiveisCreationAttributes } from '../panc/partesComestiveis.interface';

class PartesComestiveis extends Model<PartesComestiveisAttributes, PartesComestiveisCreationAttributes>
  implements PartesComestiveisAttributes {
  public id!: number;
  public parte!: string;
  public modo!: string;
  public id_panc!: number;
}

// Inicialização do model
PartesComestiveis.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    parte: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    modo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_panc: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'partes_comestiveis',
    sequelize,
    timestamps: false,
  }
);

PartesComestiveis.belongsTo(Panc, { foreignKey: 'id_panc', as: 'panc' });

export default PartesComestiveis;
