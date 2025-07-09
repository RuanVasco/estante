import { useAuth } from '../../Contexts/AuthContext';
import styles from './Account.module.css';

const Account = () => {
    const { user } = useAuth();

    return (
        <div className={styles.account}>
            {user && (
                <>
                    <h2>Minha Conta</h2>
                    <div className={styles.fieldGroup}>
                        <label>Nome</label>
                        <div className={styles.value}>{user.name}</div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label>Email</label>
                        <div className={styles.value}>{user.email}</div>
                    </div>
                </>
            )}

            {/* <button className={styles.button}>Editar informações</button> */}
        </div>
    );
};

export default Account;
