import type { BookCondition } from "./BookCondition";
import type { Book } from "./BookType";

export interface BookAdType {
  id?: number;
  book: Book;
  price: number;
  condition: BookCondition;
  comment?: string;
  cover_image_url: string | File | null;
}
