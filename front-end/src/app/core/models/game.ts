import { TagsEnum } from './tags.enum';

export interface GameI {
  _id?: any,
  name?: string,
  price?: string,
  description?: string,
  users?: string[],
  tags?: TagsEnum[]
}