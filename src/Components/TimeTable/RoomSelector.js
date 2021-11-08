import { useRooms } from "../../Hooks/useRooms";
import { Selector } from "../Selector";

export const RoomSelector = ({onChange, className, addAllOption, defaultValue}) => {
    const rooms = useRooms(addAllOption)

    return rooms && (
        <Selector defaultValue={defaultValue || rooms[0]} values={rooms} onChange={onChange} className={className} descriptionField="description"/>
    );
}