import { useState } from 'react';
import styles from './PublisherForm.module.css';
import { api } from '../../../Services/api';
import { toast } from 'react-toastify';
import type { PublisherType } from '../../../Types/PublisherType';

const PublisherForm = () => {
    const [publisher, setPublisher] = useState<PublisherType>({
        name: '',
        country: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = <K extends keyof PublisherType>(key: K, value: PublisherType[K]) => {
        setPublisher(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/publishers', {
                name: publisher.name,
                country: publisher.country
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Cadastro realizado com sucesso!');
                setPublisher({
                    name: "",
                    country: ""
                })
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || 'Erro ao cadastrar editora.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Cadastrar Editora</h2>

            <div className={styles.field}>
                <label className={styles.label}>
                    Nome
                    <input
                        type="text"
                        value={publisher.name}
                        onChange={e => handleChange('name', e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>
                    País
                    <input
                        type="text"
                        value={publisher.country}
                        onChange={e => handleChange('country', e.target.value)}
                        required
                        className={styles.input}
                    />
                </label>
            </div>

            {/* <div className={styles.field}>
                <label className={styles.label}>
                    Local de nascimento
                    <input
                        type="text"
                        value={author.birthplace}
                        onChange={e => handleChange('birthplace', e.target.value)}
                        className={styles.input}
                    />
                </label>
            </div> */}

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
        </form>
    );
};

export default PublisherForm;
