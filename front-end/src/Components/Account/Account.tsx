import styles from './Account.module.css';

const Account = () => {
    const user = {
        name: "João Silva",
        email: "joao@email.com",
        registeredAt: "2023-11-05",
    };

    return (
        <div className={styles.account}>
            <h2>Minha Conta</h2>
            <div className={styles.fieldGroup}>
                <label>Nome</label>
                <div className={styles.value}>{user.name}</div>
            </div>

            <div className={styles.fieldGroup}>
                <label>Email</label>
                <div className={styles.value}>{user.email}</div>
            </div>

            <div className={styles.fieldGroup}>
                <label>Registrado em</label>
                <div className={styles.value}>
                    {new Date(user.registeredAt).toLocaleDateString('pt-BR')}
                </div>
            </div>

            {/* <button className={styles.button}>Editar informações</button> */}
        </div>
    );
};

export default Account;
