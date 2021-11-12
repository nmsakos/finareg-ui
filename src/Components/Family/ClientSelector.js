import { useClients } from "../../Hooks/useClients"
import { Selector } from "../Selector"

export const ClientSelector = ({onChange, className, addAllOption, defaultValue}) => {
    const clients = useClients()

     return clients ? (
        <Selector defaultValue={defaultValue} values={clients} addAllOption={addAllOption} onChange={onChange} className={className} descriptionField="name" />        
    ) : null
}