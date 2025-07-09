import { useState } from 'react';
import styles from './BookForm.module.css';

export interface Book {
    title: string;
    isbn: string;
    publishedYear?: number;
}

const BookForm = () => {
    const [book, setBook] = useState<Book>({
        title: '',
        isbn: '',
        publishedYear: undefined,
    });

    const handleChange = <K extends keyof Book>(key: K, value: Book[K]) => {
        setBook(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Livro enviado:', book);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Cadastrar Livro</h2>

            <div className={styles.field}>
                <label className={styles.label}>
                    Título
                    <input
                        type="text"
                        value={book.title}
                        onChange={e => handleChange('title', e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>
                    ISBN
                    <input
                        type="text"
                        value={book.isbn}
                        onChange={e => handleChange('isbn', e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>
                    Data de publicação
                    <input
                        type="number"
                        value={book.publishedYear ?? ''}
                        onChange={e => handleChange('publishedYear', Number(e.target.value))}
                        className={styles.input}
                    />
                </label>
            </div>

            <button type="submit" className={styles.button}>
                Enviar
            </button>
        </form>
    );
};

export default BookForm;
