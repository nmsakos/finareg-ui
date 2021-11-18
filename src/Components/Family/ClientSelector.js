import { useClients } from "../../Hooks/useClients"
import { Selector } from "../Selector"

export const ClientSelector = ({...props}) => {
    const clients = useClients()

     return clients ? (
        <Selector {...props} values={clients} descriptionField="name" />        
    ) : null
}