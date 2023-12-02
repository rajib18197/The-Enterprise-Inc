import styles from './RegionBox.module.css';

export default function Region({region}){
    return <div className={styles.region}>
        <div className={styles.regionImage}></div>
        <h3 className={styles.regionName}>{region}</h3>
    </div>
}