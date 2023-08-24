import styles from './Container.module.css'

function Contaier({ children }) {
    return (
        <main className={styles.contaier}>
            {children}
        </main>
    )
}

export default Contaier