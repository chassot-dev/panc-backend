import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('pancs', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_cientifico: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    nome: {
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
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    identificacao_botanica: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('pancs');
};
