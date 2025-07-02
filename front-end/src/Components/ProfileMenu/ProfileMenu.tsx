import { useState } from 'react';
import LoginForm from '../Forms/LoginForm/LoginForm';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';
import styles from './ProfileMenu.module.css';
import { useAuth } from '@contexts/AuthContext';

const ProfileMenu = () => {
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const { isLoggedIn, logout } = useAuth();

    return (
        <div className={styles.menu}>
            {isLoggedIn ? (
                <>
                    <ul>
                        <li><a href="/perfil">Meu Perfil</a></li>
                        <li><a href="/config">Configurações</a></li>
                        <li><button onClick={logout}>Sair</button></li>
                    </ul>
                </>
            ) : (
                <>
                    {formType === 'login' ? (
                        <>
                            <LoginForm />
                            <p className={styles.link}>
                                Não tem uma conta?{' '}
                                <button
                                    type="button"
                                    className={styles.toggleButton}
                                    onClick={() => setFormType('register')}
                                >
                                    Registre-se aqui
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <RegisterForm onSuccess={() => setFormType('login')} />
                            <p className={styles.link}>
                                Já tem uma conta?{' '}
                                <button
                                    type="button"
                                    className={styles.toggleButton}
                                    onClick={() => setFormType('login')}
                                >
                                    Faça login
                                </button>
                            </p>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ProfileMenu;
