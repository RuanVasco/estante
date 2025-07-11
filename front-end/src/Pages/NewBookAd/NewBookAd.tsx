import { toast } from 'react-toastify';
import BookAdForm from '../../Components/Forms/BookAdForm/BookAdForm';
import { api } from '../../Services/api';
import type { BookAd } from '../../Types/BookAd';
import styles from './NewBookAd.module.css';

const NewBookAd = () => {
    const handleSubmit = async (ad: BookAd): Promise<void> => {
        try {
            const payload = {
                book_id: ad.book.id,
                price: ad.price,
                condition: ad.condition.toLowerCase() as "new" | "used",
                comment: ad.comment,
                cover_image: ad.coverImage
            }
            const res = await api.post('/ads', payload);

            if (res.status === 200 || res.status === 201) {
                toast.success('Anúncio criado com sucesso!');
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Erro desconhecido ao salvar anúncio';
            toast.error(msg);
        }
    };

    return (
        <section className={`container-fluid ${styles.newItem}`}>
            <BookAdForm onSubmit={handleSubmit} />
        </section>
    );
};

export default NewBookAd;
