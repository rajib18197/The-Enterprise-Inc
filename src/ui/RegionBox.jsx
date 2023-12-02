import Heading from './Heading';
import Region from './Region';

export default function RegionBox(){
    const regions = ['All', 'Southeast Asia', 'Canada', 'United Kingdom', 'United States', 'Europe']

    return <div>
        <Heading as="h3">Region List</Heading>
        {regions.map(region => <Region key={region} region={region}/>)}
    </div>
}