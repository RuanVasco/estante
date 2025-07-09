import BookAdForm from "../../Components/Forms/BookAdForm/BookAdForm";
import styles from "./NewItem.module.css";

const NewItem = () => {
    return (
        <section className={`container-fluid ${styles.newItem}`}>
            <BookAdForm onSubmit={data => console.log(data)} />
        </section>
    )
}

export default NewItem;