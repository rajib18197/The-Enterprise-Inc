import Region from './Region';
import styles from './RegionBox.module.css';

export default function RegionBox({position}){
    const regions = ['All', 'Southeast Asia', 'Canada', 'United Kingdom', 'United States', 'Europe']

    return <div className={`${styles.selectRegions}`} style={{left: `${position.x}px`, top: `${position.y}px`}}>
        <h3>Region List</h3>
        <div className={styles.regionList}>
        {regions.map(region => <Region key={region} region={region}/>)}
        </div>
    </div>
}