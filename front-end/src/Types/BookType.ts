import type { Author } from "./AuthorType";
import type { PublisherType } from "./PublisherType";

export interface Book {
  id?: number;
  title: string;
  isbn: string;
  publishedYear?: number;
  author: Author;
  publisher: PublisherType;
}