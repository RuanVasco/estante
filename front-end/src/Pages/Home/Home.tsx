import { useEffect, useState } from 'react';
import { api } from '../../Services/api';
import type { BookAdType } from '../../Types/BookAdType';
import { toast } from 'react-toastify';
import { Spinner, Pagination, Card, Form, Button } from 'react-bootstrap';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const PER_PAGE = 9;

type Filters = {
    search: string;
    condition: 'all' | 'new' | 'used';
    minPrice: string;
    maxPrice: string;
};

const defaultFilters: Filters = {
    search: '',
    condition: 'all',
    minPrice: '',
    maxPrice: '',
};

const Home = () => {
    const [ads, setAds] = useState<BookAdType[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const res = await api.get('/ads', {
                    params: {
                        page,
                        per_page: PER_PAGE,
                        sort: 'created_at_desc',
                        search: filters.search || undefined,
                        condition: filters.condition !== 'all' ? filters.condition : undefined,
                        min_price: filters.minPrice || undefined,
                        max_price: filters.maxPrice || undefined,
                    },
                });

                if (res.status === 200) {
                    setAds(res.data.data);
                    const total =
                        Number(res.headers['x-total-count']) || res.data.meta?.total || 0;
                    setTotalPages(Math.max(1, Math.ceil(total / PER_PAGE)));
                }
            } catch {
                toast.error('Erro ao buscar anúncios');
            }
            setLoading(false);
        };

        fetchAds();
    }, [page, filters]);

    const updateFilter = <K extends keyof Filters,>(k: K, v: Filters[K]) =>
        setFilters(prev => ({ ...prev, [k]: v }));

    const clearFilters = () => setFilters(defaultFilters);

    const changePage = (value: number) => setPage(value);

    return (
        <div className={`container-fluid`}>
            <div className="row">
                <aside className="col-12 col-md-3 col-lg-2 mb-4">
                    <h2 className={styles.title}>Filtros</h2>

                    <Form className={styles.sidebar}>
                        <Form.Group className="mb-3">
                            <Form.Label>Busca</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Título, autor, ISBN…"
                                value={filters.search}
                                onChange={e => updateFilter('search', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Condição</Form.Label>
                            <Form.Select
                                value={filters.condition}
                                onChange={e =>
                                    updateFilter('condition', e.target.value as Filters['condition'])
                                }
                            >
                                <option value="all">Todas</option>
                                <option value="new">Novo</option>
                                <option value="used">Usado</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Preço (R$)</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    type="number"
                                    min={0}
                                    placeholder="mín."
                                    value={filters.minPrice}
                                    onChange={e => updateFilter('minPrice', e.target.value)}
                                />
                                <Form.Control
                                    type="number"
                                    min={0}
                                    placeholder="máx."
                                    value={filters.maxPrice}
                                    onChange={e => updateFilter('maxPrice', e.target.value)}
                                />
                            </div>
                        </Form.Group>

                        <Button
                            variant="outline-secondary"
                            size="sm"
                            className="w-100"
                            onClick={clearFilters}
                            disabled={
                                !filters.search &&
                                filters.condition === 'all' &&
                                !filters.minPrice &&
                                !filters.maxPrice
                            }
                        >
                            Limpar filtros
                        </Button>
                    </Form>
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
                                        <Card className={`${styles.cardRow} w-100 flex-fill`}>
                                            <div className="d-flex gap-3">
                                                <img
                                                    src={typeof ad.cover_image_url === 'string'
                                                        ? ad.cover_image_url
                                                        : '/img/no-cover.svg'}
                                                    alt={ad.book.title}
                                                    className={styles.thumbSq}
                                                />

                                                <div className={`${styles.bodyRow}`}>
                                                    <h5 className={styles.cardTitle}>{ad.book.title}</h5>

                                                    {ad.condition && (
                                                        <p className={`${styles.condition} mb-2 flex-grow-0`}>
                                                            {ad.condition === 'new' ? 'Novo' : 'Usado'}
                                                        </p>
                                                    )}

                                                    {ad.comment && (
                                                        <p className={`${styles.comment} mb-2 flex-grow-0`}>
                                                            {ad.comment}
                                                        </p>
                                                    )}

                                                    <div className="mt-auto">
                                                        <span className={styles.price}>R$ {ad.price.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                {ad.user && (
                                                    <div className="d-flex flex-column gap-2 ms-auto">
                                                        Por: <span className={styles.user}>{ad.user.name}</span>
                                                        <Link className={styles.chatBtn} to={`/chat/${ad.user.id}`}>
                                                            Conversar
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>


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
