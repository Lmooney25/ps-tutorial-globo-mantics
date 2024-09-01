import { House } from "../types/House";
import config from "../config";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetchHouses = () => {

    return useQuery<House[], AxiosError>({
        queryKey: ["houses"],
        queryFn: () =>
            axios.get(`${config.baseApiUrl}/houses`).then((rsp) => rsp.data),
    });

}

export default useFetchHouses;