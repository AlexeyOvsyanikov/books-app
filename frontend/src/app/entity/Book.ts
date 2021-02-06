import { Author } from './Author';
import { User } from './User';

export interface Book{

  id?: number;
  title: string;
  year: number;
  description: string;
  image?: string;
  authors?: Author[] | string[];
  owners?: User[];

}
