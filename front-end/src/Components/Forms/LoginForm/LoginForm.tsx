import { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', { email, senha });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Entrar</h2>

            <label className={styles.label}>
                E-mail
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="seu@email.com"
                />
            </label>

            <label className={styles.label}>
                Senha
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="Digite sua senha"
                />
            </label>

            <button type="submit" className={styles.button}>
                Entrar
            </button>
        </form>
    );
};

export default LoginForm;
