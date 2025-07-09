import styles from './UserItems.module.css';

const UserItems = () => {
    const items = [
        {
            id: 1,
            title: "Livro: O Senhor dos Anéis",
            description: "Edição de colecionador, capa dura.",
            price: "R$ 75,00",
        },
        {
            id: 2,
            title: "Livro: Dom Casmurro",
            description: "Bom estado, sem anotações.",
            price: "R$ 20,00",
        },
    ];

    const handleEdit = (id: number) => {
        console.log(`Editar item ${id}`);
    };

    const handleRemove = (id: number) => {
        console.log(`Remover item ${id}`);
    };

    const handleNewItem = () => {
        console.log('Anunciar novo item');
    };

    return (
        <div className={styles.userItems}>
            <div className={styles.header}>
                <h2>Meus Itens Anunciados</h2>
                <button className={styles.newItemButton} onClick={handleNewItem}>
                    + Anunciar novo item
                </button>
            </div>

            {items.length === 0 ? (
                <p>Você ainda não anunciou nenhum item.</p>
            ) : (
                <ul className={styles.itemList}>
                    {items.map(item => (
                        <li key={item.id} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <span>{item.price}</span>
                                </div>
                                <div className={styles.actions}>
                                    <button onClick={() => handleEdit(item.id)}>Editar</button>
                                    <button onClick={() => handleRemove(item.id)}>Remover</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserItems;
