import { useEffect, useState } from "react";
import { House } from "../types/House";
import config from "../config";

const useFetchHouses = (): House[] => {
    const [houses, setHouses] = useState<House[]>([]);

    // Fetch houses from the API when the component mounts/ first appears on the screen.
    useEffect(() => {
        const fetchHouses = async () => {
            const rsp = await fetch(`${config.baseApiUrl}/houses`);
            const houses = await rsp.json();
            setHouses(houses);
        }

        fetchHouses();
    }, []);

    return houses;
}

export default useFetchHouses;