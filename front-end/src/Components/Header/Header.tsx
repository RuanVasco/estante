import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container-xxl">
                <div className="row">
                    <div className="col">
                        <div className="d-flex align-items-center gap-4">
                            <Logo />
                            <SearchBar />
                        </div>
                    </div>
                    <div className="col">                        
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header;