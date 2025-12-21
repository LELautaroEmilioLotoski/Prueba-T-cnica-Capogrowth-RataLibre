import { IProductApiData } from './IProductApiData';

export interface IProductInfo {
  data: IProductApiData;
  dataDescription: {
    plain_text: string;
  };
}

