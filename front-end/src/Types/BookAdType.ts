import type { BookCondition } from "./BookCondition";
import type { Book } from "./BookType";
import type { UserType } from "./UserType";

export interface BookAdType {
  id?: number;
  book: Book;
  price: number;
  condition: BookCondition;
  comment?: string;
  cover_image_url: string | File | null;
  user?: UserType;
}
