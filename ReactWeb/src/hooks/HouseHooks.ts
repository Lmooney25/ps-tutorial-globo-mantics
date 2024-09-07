import { House } from "../types/House";
import config from "../config";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

// const useFetchHouses = (): House[] => {
//     const [houses, setHouses] = useState<House[]>([]);

//     // Fetch houses from the API when the component mounts/ first appears on the screen.
//     useEffect(() => {
//         const fetchHouses = async () => {
//             const rsp = await fetch(`${config.baseApiUrl}/houses`);
//             const houses = await rsp.json();
//             setHouses(houses);
//         }

//         fetchHouses();
//     }, []);

//     return houses;
// }

const useFetchHouses = () => {

    return useQuery<House[], AxiosError>({
        queryKey: ["houses"],
        queryFn: () =>
            axios.get(`${config.baseApiUrl}/houses`).then((rsp) => rsp.data),
    });

}

const useFetchHouse = (id: number) => {
    return useQuery<House, AxiosError>({
        queryKey: ["house", id],
        queryFn: () => 
            axios.get(`${config.baseApiUrl}/houses/${id}`).then((rsp) => rsp.data),
    })
}

export default useFetchHouses;
export { useFetchHouse };