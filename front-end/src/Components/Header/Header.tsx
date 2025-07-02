import { useState } from "react";
import Logo from "../Logo/Logo";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Header.module.css';
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    
    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <header className={styles.header}>
            <div className="container-xxl">
                <div className="row">
                    <div className="col d-flex align-items-center gap-4">
                        <Logo />
                        <SearchBar placeholder="Pesquisar" />
                    </div>
                    <div className="col d-flex align-items-center justify-content-end position-relative">
                        <div onClick={toggleMenu}>
                            <ProfileIcon />
                        </div>
                        {menuOpen && <ProfileMenu />}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;