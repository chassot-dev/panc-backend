export interface PancAttributes {
  id: number;
  nome: string;
  img: string;
  nome_cientifico: string;
  familia_botanica: string;
  origem: string;
  habito_crescimento: string;
  identificacao_botanica: string;
}

export type PancCreationAttributes = Omit<PancAttributes, 'id'>;
