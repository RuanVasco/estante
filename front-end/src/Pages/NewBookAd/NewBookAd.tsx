import BookAdForm from "../../Components/Forms/BookAdForm/BookAdForm";
import styles from "./NewBookAd.module.css";

const NewBookAd = () => {
    return (
        <section className={`container-fluid ${styles.newItem}`}>
            <BookAdForm onSubmit={data => console.log(data)} />
        </section>
    )
}

export default NewBookAd;