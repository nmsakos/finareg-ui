import { useRooms } from "../../Hooks/useRooms";
import { Selector } from "../Selector";

export const RoomSelector = ({...props}) => {
    const rooms = useRooms()

    return rooms ? (
        <Selector {...props} values={rooms} descriptionField="description"/>
    ) : null;
}