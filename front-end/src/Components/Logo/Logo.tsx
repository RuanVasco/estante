import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div>
            <Link to="/" className={styles.logo}>Estante</Link>
        </div>
    )
}

export default Logo;