import { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { api } from '../../../Services/api';
import styles from './BookAdForm.module.css';
import type { BookAdType } from '../../../Types/BookAdType';
import type { BookCondition } from '../../../Types/BookCondition';

type Option = { value: number; label: string };

type Props = {
    initialData?: BookAdType | null;
    onSubmit: (ad: BookAdType) => void;
    loading?: boolean;
};

const emptyBook = { id: 0, title: '', isbn: '', author: { name: '' }, publisher: { name: '', country: '' } };

export default function BookAdForm({ initialData, onSubmit, loading = false }: Props) {
    const [ad, setAd] = useState<BookAdType>(
        initialData ?? {
            book: emptyBook,
            price: 0,
            condition: 'used',
            comment: '',
            cover_image_url: null,
        }
    );
    const [error, setError] = useState('');

    const [preview, setPreview] = useState<string | null>(
        typeof ad.cover_image_url === 'string' ? ad.cover_image_url : null
    );

    useEffect(() => {
        if (initialData) setAd(initialData);
    }, [initialData]);

    const handleChange = <K extends keyof BookAdType>(key: K, val: BookAdType[K]) =>
        setAd((prev) => ({ ...prev, [key]: val }));

    const loadBooks = async (input: string): Promise<Option[]> => {
        const res = await api.get('/books', { params: { search: input } });
        return res.data.map((b: any) => ({
            value: b.id,
            label: `${b.title} — ${b.isbn}`,
        }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!ad.book.id || ad.price <= 0) return setError('Preencha todos os campos obrigatórios.');
        setError('');
        onSubmit(ad);
    };

    return (
        <form onSubmit={submit} className={`container-xxl ${styles.form}`}>
            <label className={styles.label}>
                Livro
                <AsyncSelect
                    cacheOptions
                    loadOptions={loadBooks}
                    defaultOptions
                    placeholder="Selecione um livro..."
                    value={ad.book.id ? { value: ad.book.id, label: ad.book.title } : null}
                    onChange={(opt) =>
                        handleChange(
                            'book',
                            opt
                                ? { ...emptyBook, id: opt.value, title: opt.label.split(' — ')[0], isbn: opt.label.split(' — ')[1] }
                                : emptyBook
                        )
                    }
                />
            </label>

            <label className={styles.label}>
                Preço (R$)
                <input
                    type="number"
                    min={0}
                    step={0.01}
                    className={styles.input}
                    value={ad.price}
                    onChange={(e) => handleChange('price', +e.target.value)}
                />
            </label>

            <label className={styles.label}>
                Condição
                <select
                    value={ad.condition}
                    onChange={(e) => handleChange('condition', e.target.value as BookCondition)}
                    className={styles.input}
                >
                    <option value="used">Usado</option>
                    <option value="new">Novo</option>
                </select>
            </label>

            <label className={styles.label}>
                Comentário
                <textarea
                    className={styles.textarea}
                    placeholder="Informações extras sobre o livro"
                    value={ad.comment}
                    onChange={(e) => handleChange('comment', e.target.value)}
                />
            </label>

            <label className={styles.label}>
                Imagem da capa
                <input
                    type="file"
                    accept="image/*"
                    className={styles.input}
                    onChange={e => {
                        const file = e.target.files?.[0] ?? null;
                        handleChange('cover_image_url', file);
                        if (file) setPreview(URL.createObjectURL(file));
                    }}
                />
                {preview && (
                    <img src={preview} alt="Capa" className={styles.coverThumb} />
                )}
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Salvando…' : initialData ? 'Atualizar anúncio' : 'Publicar anúncio'}
            </button>
        </form>
    );
}
