import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
// import SearchBar from '../SearchBar/SearchBar';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import styles from './Header.module.css';
import { useAuth } from '../../Contexts/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
                setMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <header className={styles.header}>
            <div className={`container-fluid ${styles.inner}`}>
                <div className={styles.left}>
                    <Logo />
                    {/* <SearchBar placeholder="Pesquisar" /> */}
                </div>

                <div className={styles.right} ref={wrapperRef}>
                    {isLoggedIn && (
                        <nav className={styles.links}>
                            <Link to="/perfil/anuncios">Meus Anúncios</Link>
                            <Link to="/chat">Chat</Link>
                        </nav>
                    )}

                    <button
                        aria-label="Abrir menu do usuário"
                        className={styles.iconButton}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <ProfileIcon />
                    </button>

                    {menuOpen && <ProfileMenu />}
                </div>
            </div>
        </header>
    );
};

export default Header;
