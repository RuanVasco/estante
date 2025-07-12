import { useEffect, useState } from 'react';
import { api } from '../../Services/api';
import styles from './Home.module.css';
import type { BookAdType } from '../../Types/BookAdType';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const Home = () => {
    const [ads, setAds] = useState<BookAdType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAds = async () => {
        setLoading(true);
        try {
            const res = await api.get('/ads');

            if (res.status === 200) {
                setAds(res.data.data);
            }
        } catch (error) {
            toast.error('Erro ao buscar anúncios');
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <div className={`container-fluid ${styles.home}`}>
            <div className="row">
                <div className="col-2">
                    <h3>Filtros</h3>
                </div>
                <div className="col">
                    {loading ? (
                        <div className='d-flex justify-content-center align-items-center p-2'>
                            <Spinner animation="border" role="status" variant="secondary">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : ads.length === 0 ? (
                        <p>Você ainda não anunciou nenhum livro.</p>
                    ) : (
                        <ul className={styles.itemList}>
                            {ads.map(ad => (
                                <li key={ad.id} className={styles.item}>
                                    <div className={styles.itemInfo}>
                                        <div>
                                            <h4>{ad.book.title}</h4>
                                            <p>{ad.comment}</p>
                                            <span>R$ {ad.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
