import styles from '../styles/ErrorMessage.module.css';

export default function ErrorMessage(props) {

    if (!props.message) {
        return null
    } else {
        return (
            <div className={styles.box}>
                <h4 className={styles.header}>Error</h4>
                <p className={styles.message}>{props.message}</p>
            </div> 
        )
    }
}