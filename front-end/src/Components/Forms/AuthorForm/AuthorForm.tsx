import { useState } from 'react';
import styles from './AuthorForm.module.css';
import type { Author } from '../../../Types/AuthorType';
import { api } from '../../../Services/api';
import { toast } from 'react-toastify';

const AuthorForm = () => {
    const [author, setAuthor] = useState<Author>({
        name: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = <K extends keyof Author>(key: K, value: Author[K]) => {
        setAuthor(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/authors', {
                name: author.name,
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Cadastro realizado com sucesso!');
                setAuthor({
                    name: ""
                })
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || 'Erro ao fazer login.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Cadastrar Autor</h2>

            <div className={styles.field}>
                <label className={styles.label}>
                    Nome
                    <input
                        type="text"
                        value={author.name}
                        onChange={e => handleChange('name', e.target.value)}
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

export default AuthorForm;
