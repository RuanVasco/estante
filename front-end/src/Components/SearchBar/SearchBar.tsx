import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
    placeholder?: string; 
};

const SearchBar = ({ placeholder = "Pesquisar..." }: SearchBarProps) => {
    const [value, setValue] = useState<string>("");

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                className={styles.input}
            />
            <FaSearch className={styles.icon} />
        </div>
    );
};

export default SearchBar;
