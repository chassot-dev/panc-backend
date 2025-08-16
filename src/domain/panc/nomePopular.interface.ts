export interface NomePopularAttributes {
  id: number;
  nome: string;
  id_panc: number;
}

export interface NomePopularCreationAttributes
  extends Partial<Pick<NomePopularAttributes, 'id'>> {}
