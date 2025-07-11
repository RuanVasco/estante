import type { BookCondition } from "./BookCondition";
import type { Book } from "./BookType";

export interface BookAd {
  id?: number;
  book: Book;
  price: number;
  condition: BookCondition;
  comment?: string;
  coverImage?: File | null;
}