import { House } from "../types/House";
import useFetchHouses from "../hooks/HouseHooks";
import { currencyFormatter } from "../config";
import ApiStatus from "../types/apiStatus";


const HouseList = () => {
    const { data, status, isSuccess } = useFetchHouses();

    if (!isSuccess) {
        return <ApiStatus status={status} />
    }

    return (
        <div>
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">
                    Houses currently on the market
                </h5>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Asking Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((h) => (
                        <tr key={h.id}>
                            <td>{h.address}</td>
                            <td>{h.country}</td>
                            <td>{currencyFormatter.format(h.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HouseList;