import { useRooms } from "../../Hooks/useRooms";
import { Selector } from "../Selector";

export const RoomSelector = ({onChange, className, addAllOption, defaultValue}) => {
    const rooms = useRooms()

    return rooms ? (
        <Selector defaultValue={defaultValue} values={rooms} addAllOption={addAllOption} onChange={onChange} className={className} descriptionField="description"/>
    ) : null;
}