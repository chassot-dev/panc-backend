export interface PartesComestiveisAttributes {
  id: number;
  parte: string;
  modo: string;
  id_panc: number;
}

export interface PartesComestiveisCreationAttributes
  extends Partial<Pick<PartesComestiveisAttributes, 'id'>> {}
