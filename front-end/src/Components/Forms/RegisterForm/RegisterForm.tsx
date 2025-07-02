import { useState } from 'react';
import styles from './RegisterForm.module.css';
import type { UserType } from '../../../Types/UserType';
import { api } from '@services/api';
import { toast } from 'react-toastify';

type RegisterFormProps = {
    onSuccess?: () => void;
};

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const [userForm, setUserForm] = useState<UserType>({
        name: '',
        email: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userForm.password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await api.post('/register', userForm);

            setUserForm({ name: '', email: '', password: '' });
            setConfirmPassword('');

            toast.success('Conta criada com sucesso!');

            if (onSuccess) onSuccess();
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || 'Erro ao registrar usuário.';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className={styles.title}>Registrar</h2>

            <label className={styles.label}>
                Nome
                <input
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="Seu nome"
                />
            </label>

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

            <label className={styles.label}>
                Confirmar Senha
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="Confirme sua senha"
                />
            </label>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Cadastrando...' : 'Criar conta'}
            </button>
        </form>
    );
};

export default RegisterForm;
