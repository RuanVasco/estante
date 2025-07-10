import { useState } from 'react';
import styles from './BookAdForm.module.css';
import type { BookAd } from '../../../Types/BookAd';
import type { BookCondition } from '../../../Types/BookCondition';
import AsyncSelect from 'react-select/async';
import { api } from '../../../Services/api';
import type { Book } from '../../../Types/BookType';

type Props = {
    initialData?: BookAd;
    onSubmit: (ad: BookAd) => void;
    loading?: boolean;
};

type OptionType = {
    value: number;
    label: string;
};

const BookAdForm = ({ initialData, onSubmit, loading = false }: Props) => {
    const emptyBook: Book = { title: '', isbn: '', publishedYear: undefined, author: { name: "" }, publisher: { name: "", country: "" } };

    const [ad, setAd] = useState<BookAd>(
        initialData ?? {
            book: emptyBook,
            price: 0,
            condition: 'used',
            comment: '',
            coverImage: null,
        }
    );

    const [error, setError] = useState("");

    const handleChange = <K extends keyof BookAd>(key: K, value: BookAd[K]) => {
        setAd(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (ad.book.title === "" || ad.price <= 0 || !ad.condition) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }
        setError("");
        onSubmit(ad);
    };

    const loadBooks = async (inputValue: string): Promise<OptionType[]> => {
        const res = await api.get(`/books`, { params: { search: inputValue } });
        return res.data.map((book: any) => ({
            value: book.id,
            label: `${book.title} - ${book.isbn}`,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className={`container-xxl ${styles.form}`}>
            <h2 className={styles.title}>
                {initialData ? "Editar Anúncio" : "Novo Anúncio"}
            </h2>

            <label className={styles.label}>
                Livro
                <AsyncSelect
                    cacheOptions
                    loadOptions={loadBooks}
                    defaultOptions
                    onChange={(option) =>
                        handleChange('book', option
                            ? { id: Number(option.value), title: option.label, isbn: '', author: { name: '' }, publisher: { name: '', country: '' } }
                            : emptyBook)
                    }
                    placeholder="Selecione um livro..."
                />
            </label>

            <label className={styles.label}>
                Preço (R$)
                <input
                    type="number"
                    value={ad.price}
                    onChange={e => handleChange("price", Number(e.target.value))}
                    min={0}
                    step={0.01}
                    required
                    className={styles.input}
                />
            </label>

            <label className={styles.label}>
                Condição
                <select
                    value={ad.condition}
                    onChange={e => handleChange("condition", e.target.value as BookCondition)}
                    className={styles.input}
                >
                    <option value="used">Usado</option>
                    <option value="new">Novo</option>
                </select>
            </label>

            <label className={styles.label}>
                Comentário adicional
                <textarea
                    value={ad.comment}
                    onChange={e => handleChange("comment", e.target.value)}
                    className={styles.textarea}
                    placeholder="Informações extras sobre o estado do livro"
                />
            </label>

            <label className={styles.label}>
                Imagem da capa
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleChange("coverImage", e.target.files?.[0] || null)}
                    className={styles.input}
                />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Salvando..." : initialData ? "Atualizar Anúncio" : "Publicar Anúncio"}
            </button>
        </form>
    );
};

export default BookAdForm;
