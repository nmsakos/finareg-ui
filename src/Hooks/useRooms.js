import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_ROOMS } from "../GraphQL/Queries/timeTableQueries";

export const useRooms = (addAllOption) => {
    const [rooms, setRooms] = useState([]);
    const { error, data } = useQuery(LOAD_ROOMS);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (data) {
            let dataRooms = data.rooms.map(value => { return { id: value.id, description: value.description } });
            if (addAllOption) {
                dataRooms = [{ id: "-1", description: "Összes" }, ...dataRooms]
            }
            setRooms(dataRooms);
        }
    }, [error, data, addAllOption]);

    return rooms;

}