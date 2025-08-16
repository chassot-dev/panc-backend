import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('partes_comestiveis', {
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
      references: {
        model: 'pancs',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('partes_comestiveis');
};
