import { useEffect, useState } from 'react';
import { api } from '../../Services/api';
import type { BookAdType } from '../../Types/BookAdType';
import { toast } from 'react-toastify';
import { Spinner, Pagination, Card } from 'react-bootstrap';
import styles from './Home.module.css';

const PER_PAGE = 9;

const Home = () => {
    const [ads, setAds] = useState<BookAdType[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const res = await api.get('/ads', {
                    params: {
                        page,
                        per_page: PER_PAGE,
                        sort: 'created_at_desc',
                    },
                });

                if (res.status === 200) {
                    setAds(res.data.data);

                    const total =
                        Number(res.headers['x-total-count']) ||
                        res.data.meta?.total ||
                        0;

                    setTotalPages(Math.max(1, Math.ceil(total / PER_PAGE)));
                }
            } catch {
                toast.error('Erro ao buscar anúncios');
            }
            setLoading(false);
        };

        fetchAds();
    }, [page]);

    const changePage = (value: number) => setPage(value);

    return (
        <div className={`container-fluid ${styles.home}`}>
            <div className="row pe-2">
                <aside className="col-12 col-md-2 mb-4">
                    <h3 className={styles.sidebarTitle}>Filtros</h3>
                </aside>

                <main className="col">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center p-5">
                            <Spinner animation="border" role="status" variant="secondary">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : ads.length === 0 ? (
                        <p>Nenhum anúncio encontrado.</p>
                    ) : (
                        <>
                            <h2 className={styles.title}>Últimos anúncios</h2>
                            <div className="row g-4">
                                {ads.map(ad => (
                                    <div key={ad.id} className="col-12 col-md-6 col-lg-4 d-flex">
                                        <Card className={`${styles.card} w-100 h-100 flex-fill`}>
                                            {ad.cover_image_url && (
                                                <Card.Img
                                                    variant="top"
                                                    src={
                                                        ad.cover_image_url && typeof ad.cover_image_url === 'string'
                                                            ? ad.cover_image_url
                                                            : '/img/no-cover.svg'
                                                    }
                                                    alt={ad.book.title}
                                                />
                                            )}

                                            <Card.Body className="d-flex flex-column">
                                                <Card.Title className={styles.cardTitle}>{ad.book.title}</Card.Title>

                                                {ad.comment && (
                                                    <Card.Text className={`${styles.comment} mb-3`}>
                                                        {ad.comment}
                                                    </Card.Text>
                                                )}

                                                <div className="mt-auto">
                                                    <span className={styles.price}>R$ {ad.price.toFixed(2)}</span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>


                            {/* Paginação */}
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center mt-4">
                                    <Pagination>
                                        <Pagination.First
                                            disabled={page === 1}
                                            onClick={() => changePage(1)}
                                        />
                                        <Pagination.Prev
                                            disabled={page === 1}
                                            onClick={() => changePage(page - 1)}
                                        />
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                            <Pagination.Item
                                                key={num}
                                                active={num === page}
                                                onClick={() => changePage(num)}
                                            >
                                                {num}
                                            </Pagination.Item>
                                        ))}
                                        <Pagination.Next
                                            disabled={page === totalPages}
                                            onClick={() => changePage(page + 1)}
                                        />
                                        <Pagination.Last
                                            disabled={page === totalPages}
                                            onClick={() => changePage(totalPages)}
                                        />
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;
