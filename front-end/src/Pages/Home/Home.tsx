import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={`container-fluid ${styles.home}`}>
            <div className="row">
                <div className="col-3">
                    <h3>Filtros</h3>
                </div>
                <div className="col">
                    <h3>Dados</h3>
                </div>
            </div>
        </div>
    );
};

export default Home;