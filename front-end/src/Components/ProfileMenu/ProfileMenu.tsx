import { useState } from 'react';
import LoginForm from '../Forms/LoginForm/LoginForm';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';
import styles from './ProfileMenu.module.css';
import { useAuth } from '../../Contexts/AuthContext';
import { Link } from 'react-router-dom';

const ProfileMenu = () => {
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const { user, isLoggedIn, logout } = useAuth();

    return (
        <div className={styles.menu}>
            {(isLoggedIn && user) ? (
                <>
                    <span className={styles.name}>{user.name}</span>
                    <ul className={styles.loggedInMenu}>
                        <li><Link to="/perfil">Meu Perfil</Link></li>
                        <li><Link to="/cadastro">Solicitar cadastro</Link></li>
                        <li><Link to="/configuracoes">Configurações</Link></li>
                        <li><Link to="/ajuda">Ajuda</Link></li>
                    </ul>
                    <button className={styles.logoutButton} onClick={logout}>Sair</button>
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
