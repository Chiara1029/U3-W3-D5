import { Favorite } from './favorite';

export interface UserInfo {
  nome: String;
  cognome: String;
  email: String;
  id: Number;
  favorite: Favorite[];
}
