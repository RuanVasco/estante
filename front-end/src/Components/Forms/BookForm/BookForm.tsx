import { useState } from 'react';
import styles from './BookForm.module.css';
import type { Book } from '../../../Types/BookType';
import AsyncSelect from 'react-select/async';
import { api } from '../../../Services/api';
import type { Author } from '../../../Types/AuthorType';
import type { PublisherType } from '../../../Types/PublisherType';
import { toast } from 'react-toastify';

type OptionType = {
    value: number;
    label: string;
};

const BookForm = () => {
    const emptyAuthor: Author = { id: 0, name: '' };
    const emptyPublisher: PublisherType = { id: 0, name: '', country: '' }

    const [book, setBook] = useState<Book>({
        title: '',
        isbn: '',
        publishedYear: undefined,
        author: emptyAuthor,
        publisher: emptyPublisher
    });
    const [loading, setLoading] = useState(false);

    const loadAuthors = async (inputValue: string): Promise<OptionType[]> => {
        const res = await api.get(`/authors`, { params: { search: inputValue } });
        return res.data.map((author: any) => ({
            value: author.id,
            label: author.name,
        }));
    };

    const loadPublishers = async (inputValue: string): Promise<OptionType[]> => {
        const res = await api.get(`/publishers`, { params: { search: inputValue } });
        return res.data.map((publisher: any) => ({
            value: publisher.id,
            label: publisher.name,
        }));
    };

    const handleChange = <K extends keyof Book>(key: K, value: Book[K]) => {
        setBook(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            book.publishedYear === undefined ||
            isNaN(book.publishedYear) ||
            book.publishedYear <= 0 ||
            book.publishedYear > new Date().getFullYear()
        ) {
            toast.error(`Ano de publicação inválido.`);
            return;
        }

        if (!book.title || !book.isbn || !book.publishedYear) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        if (!book.author.id || !book.publisher.id) {
            alert("Autor e editora devem ser selecionados.");
            return;
        }

        const payload = {
            title: book.title,
            isbn: book.isbn,
            published_year: book.publishedYear,
            author_id: book.author.id,
            publisher_id: book.publisher.id,
        };

        try {
            setLoading(true);

            const response = await api.post('/books', payload);

            if (response.status != 200 && response.status != 201) {
                toast.error("Erro ao salvar o livro.");
                return;
            }

            setBook({
                title: '',
                isbn: '',
                publishedYear: undefined,
                author: emptyAuthor,
                publisher: emptyPublisher
            });
            toast.success("Livro cadastrado com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar o livro.");
        } finally {
            setLoading(false);
        }
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
                    Ano de publicação
                    <input
                        type="number"
                        value={book.publishedYear ?? ''}
                        onChange={e => handleChange('publishedYear', Number(e.target.value))}
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Autor
                    <AsyncSelect
                        cacheOptions
                        loadOptions={loadAuthors}
                        defaultOptions
                        onChange={(option) =>
                            handleChange('author', option
                                ? { id: Number(option.value), name: option.label }
                                : emptyAuthor)
                        }
                        placeholder="Selecione um autor..."
                    />
                </label>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Editora
                    <AsyncSelect
                        cacheOptions
                        loadOptions={loadPublishers}
                        defaultOptions
                        onChange={(option) =>
                            handleChange('publisher', option
                                ? { id: Number(option.value), name: option.label, country: '' }
                                : emptyPublisher)
                        }
                        placeholder="Selecione uma editora..."
                    />
                </label>
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
        </form>
    );
};

export default BookForm;
