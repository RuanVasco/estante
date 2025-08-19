import styles from './UserItems.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../Services/api';
import { useAuth } from '../../Contexts/AuthContext';
import type { BookAdType } from '../../Types/BookAdType';
import Modal from 'react-bootstrap/Modal';
import BookAd from '../../Pages/BookAd/BookAd';
import { FaPlus } from 'react-icons/fa6';
import { Spinner } from 'react-bootstrap';

const UserItems = () => {
    const { user } = useAuth();
    const [ads, setAds] = useState<BookAdType[]>([]);
    const [modalType, setModalType] = useState<'create' | 'edit'>('create');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adId, setAdId] = useState<number | null>(null);

    const fetchAds = async () => {
        if (!user || !user.id) return;

        setLoading(true);

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

        setLoading(false);
    }

    const deleteAd = async (id: number) => {

        setLoading(true);

        try {
            const res = await api.delete(`/ads/${id}`);

            if (res.status !== 200 && res.status !== 204) {
                toast.error("Erro ao remover anúncio.");
                return;
            }

            setAds(prev => prev.filter(ad => ad.id !== id));
            toast.success("Anúncio removido com sucesso!");
        } catch {
            toast.error("Erro ao remover anúncio.");
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchAds();
    }, []);

    const handleEdit = (id: number | null) => {
        if (!id) return;
        setModalType('edit');
        setShow(true);
        setAdId(id);
    };

    const handleRemove = (id: number | null) => {
        if (!id) return;
        deleteAd(id);
    };

    const handleSubmit = () => {
        handleHide();
        fetchAds();
    }

    const handleHide = () => {
        setShow(false);
        setModalType('create');
        setAdId(null);
    };

    return (
        <div className={styles.userItems}>
            <div className={styles.header}>
                <h2>Meus Livros Anunciados</h2>
                <button onClick={() => setShow(true)} className={styles.newItemButton}>
                    <FaPlus /> Anunciar novo livro
                </button>
            </div>

            {loading ? (
                <div className={styles.loading}>
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
                                    <span>R$ {ad.price}</span>
                                </div>
                                <div className={styles.actions}>
                                    <button onClick={() => handleEdit(ad.id ?? null)}>Editar</button>
                                    <button onClick={() => handleRemove(ad.id ?? null)}>Remover</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <Modal show={show} onHide={handleHide} size='xl'>
                <Modal.Header closeButton>
                    <h2 className={styles.formTitle}>
                        {modalType === "create" ? "Anunciar Novo Livro" : "Editar Anúncio"}</h2>
                </Modal.Header>
                <Modal.Body style={{ padding: '1rem 0.5rem' }}>
                    <BookAd onSuccess={handleSubmit} mode={modalType} adId={modalType === "edit" ? adId : null} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserItems;
