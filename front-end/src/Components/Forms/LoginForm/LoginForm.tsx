import { useState } from 'react';
import styles from './LoginForm.module.css';
import type { UserType } from '../../../Types/UserType';
import { api } from '@services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../../Contexts/AuthContext';

const LoginForm = () => {
    const [userForm, setUserForm] = useState<UserType>({
        name: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/login', {
                email: userForm.email,
                password: userForm.password,
            });

            if (response.data?.token) {
                login(response.data.token);
                toast.success('Login realizado com sucesso!');
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || 'Erro ao fazer login.';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className={styles.title}>Entrar</h2>

            <label className={styles.label}>
                E-mail
                <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="seu@email.com"
                />
            </label>

            <label className={styles.label}>
                Senha
                <input
                    type="password"
                    name="password"
                    value={userForm.password}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="Digite sua senha"
                />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    );
};

export default LoginForm;
