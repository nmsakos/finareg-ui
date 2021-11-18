import { useEffect, useState } from "react"
import { days } from "../../utils"
import { Selector } from "../Selector"

export const DaySelector = ({ ...props }) => {
    return days ? (
        <Selector {...props} values={days} descriptionField="description" />
    ) : null
}