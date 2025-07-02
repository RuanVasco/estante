import styles from './ProfileMenu.module.css';
import { useAuth } from '@contexts/AuthContext';

const ProfileMenu = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <div className={styles.menu}>
            {isLoggedIn ? (
                <div>
                    <ul>
                        <li><a href="/perfil">Meu Perfil</a></li>
                        <li><a href="/config">Configurações</a></li>
                        <li><button>Sair</button></li>
                    </ul>
                    <button className='btn btn-secondary' onClick={() => logout}>Logout</button>
                </div>

            ) : (
                <div>
                    Logar
                    <input type="email" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <button className="btn btn-secondary">Logar</button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
