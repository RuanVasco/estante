import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../Services/api';
import BookAdForm from '../../Components/Forms/BookAdForm/BookAdForm';
import type { BookAdType } from '../../Types/BookAdType';
import styles from './BookAd.module.css';
import { Spinner } from 'react-bootstrap';

type Props = {
    onSuccess: () => void;
    mode: 'create' | 'edit';
    adId?: number | null;
};

const emptyAd: BookAdType = {
    book: { id: 0, title: '', isbn: '', author: { name: '' }, publisher: { name: '', country: '' } },
    price: 0,
    condition: 'used',
    comment: '',
    cover_image_url: null,
};

export default function BookAdModal({ onSuccess, mode = 'create', adId = null }: Props) {
    const [loading, setLoading] = useState(false);
    const [loadingAd, setLoadingAd] = useState(false);
    const [ad, setAd] = useState<BookAdType>(emptyAd);

    const buildRequest = (src: BookAdType, edit: boolean, id?: number) => {
        const isMultipart = src.cover_image_url instanceof File;
        const fd = isMultipart ? new FormData() : null;

        const base = {
            book_id: src.book.id,
            price: src.price,
            condition: src.condition.toLowerCase(),
            comment: src.comment ?? '',
        };

        if (isMultipart && fd) {
            Object.entries(base).forEach(([k, v]) => fd.append(k, String(v)));
            fd.append('cover_image', src.cover_image_url as File);

            if (edit) fd.append('_method', 'PUT');

            return {
                url: edit ? `/ads/${id}` : '/ads',
                method: edit && isMultipart ? 'post' : 'post',
                data: fd,
                headers: { 'Content-Type': undefined },
            };
        }

        return {
            url: edit ? `/ads/${id}` : '/ads',
            method: edit ? 'put' : 'post',
            data: base,
            headers: undefined,
        };
    };

    useEffect(() => {
        if (mode === 'edit' && adId) fetchAd(adId);
    }, [mode, adId]);

    const fetchAd = async (id: number) => {
        setLoadingAd(true);
        try {
            const { data } = await api.get(`/ads/${id}`);
            setAd(data);
        } catch {
            toast.error('Erro ao buscar anúncio.');
        }
        setLoadingAd(false);
    };

    const handleSubmit = async (formData: BookAdType) => {
        setLoading(true);

        const { url, method, data, headers } = buildRequest(formData, mode === 'edit', adId ?? undefined);

        try {
            const res = await api.request({ url, method, data, headers });

            if (res.status === 200 || res.status === 201) {
                toast.success(mode === 'edit' ? 'Anúncio atualizado!' : 'Anúncio criado!');
                onSuccess();
            }
        } catch (e: any) {
            toast.error(e?.response?.data?.message ?? 'Erro ao salvar anúncio.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className={styles.wrapper}>
            {loadingAd ? (
                <div className='d-flex justify-content-center align-items-center p-2'>
                    <Spinner animation="border" role="status" variant="secondary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <BookAdForm initialData={mode === "edit" ? ad : null} onSubmit={handleSubmit} loading={loading} />
            )}
        </section>
    );
}
