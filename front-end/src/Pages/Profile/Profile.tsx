import { useState } from 'react';
import styles from './Profile.module.css';
import Account from '../../Components/Account/Account';

const Profile = () => {
    const [viewType, setViewType] = useState<"account" | "items">("account");

    return (
        <div className={`container-fluid ${styles.profile}`}>
            <div className="row">
                <div className="col-3">
                    <div className={styles.sidebar}>
                        <h3>Menu</h3>
                        <ul className={styles.menuList}>
                            <li
                                className={viewType === "account" ? styles.active : ""}
                                onClick={() => setViewType("account")}
                            >
                                Conta
                            </li>
                            <li
                                className={viewType === "items" ? styles.active : ""}
                                onClick={() => setViewType("items")}
                            >
                                Itens anunciados
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col">
                    {viewType === "account" && <Account />}
                    {viewType === "items" && <div><h4>Seus itens aqui</h4></div>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
