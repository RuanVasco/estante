import { Link } from 'react-router-dom';
import styles from './UserItems.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../Services/api';
import { useAuth } from '../../Contexts/AuthContext';
import type { BookAd } from '../../Types/BookAd';

const UserItems = () => {
    const { user } = useAuth();
    const [ads, setAds] = useState<BookAd[]>([]);

    const fetchAds = async () => {
        if (!user || !user.id) return;

        try {
            const res = await api.get(`/users/${user.id}/ads`);

            if (res.status !== 200 && res.status !== 201) {
                toast.error("Erro ao buscar anuncios.")
                return;
            }

            setAds(res.data.data);
        } catch {
            toast.error("Erro ao buscar anuncios.")
        }
    }

    useEffect(() => {
        fetchAds();
    }, []);

    const handleEdit = (id: number) => {
        console.log(`Editar item ${id}`);
    };

    const handleRemove = (id: number) => {
        console.log(`Remover item ${id}`);
    };

    return (
        <div className={styles.userItems}>
            <div className={styles.header}>
                <h2>Meus Livros Anunciados</h2>
                <Link className={styles.newItemButton} to="/anunciar">
                    + Anunciar novo livro
                </Link>
            </div>

            {ads.length === 0 ? (
                <p>Você ainda não anunciou nenhum livro.</p>
            ) : (
                <ul className={styles.itemList}>
                    {ads.map(ad => (
                        <li key={ad.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div>
                                    <h4>{ad.book.title}</h4>
                                    {/* <p>{ad.book.}</p> */}
                                    <span>{ad.price}</span>
                                </div>
                                <div className={styles.actions}>
                                    <button onClick={() => handleEdit(ad.id === null ? ad.id : -1)}>Editar</button>
                                    <button onClick={() => handleRemove(ad.id === null ? ad.id : -1)}>Remover</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserItems;
