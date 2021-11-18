import { useFamilies } from "../../Hooks/useFamilies"
import { Selector } from "../Selector"

export const FamilySelector = ({...props}) => {
    const families = useFamilies(true)

     return families ? (
        <Selector {...props} values={families} descriptionField="name" />        
    ) : null
}