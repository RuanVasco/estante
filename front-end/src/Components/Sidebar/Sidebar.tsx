import styles from "./Sidebar.module.css";

type SidebarItem = {
    key: string;
    label: string;
    onClick: () => void;
    active?: boolean;
};

type Props = {
    col?: number;
    items: SidebarItem[];
    title?: string;
};

const Sidebar = ({ col = 3, items, title }: Props) => {
    return (
        <div className={`col-${col}`}>
            <div className={styles.sidebar}>
                {title && <h3>{title}</h3>}
                <ul className={styles.menuList}>
                    {items.map(item => (
                        <li
                            key={item.key}
                            className={item.active ? styles.active : ""}
                            onClick={item.onClick}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
