import { useEffect, useState } from "react"
import axios from "axios"
import { client as apolloClient } from "./Config/ApolloProviderWithClient"
import { SAVE_EVENT_DURATION, SAVE_EVENT_STATE, SAVE_ROOM, SAVE_THERAPY_TYPE } from "./GraphQL/Mutations/baseDataMutators"
import { SAVE_THERAPIST } from "./GraphQL/Mutations/therapyMutators"
import { SAVE_CLIENT, SAVE_FAMILY } from "./GraphQL/Mutations/familyMutators"
import { CREATE_TIME_TABLE } from "./GraphQL/Mutations/timeTableMutators"
import { days, formatTime, getHourAndMin } from "./utils"

export const Bootstrap = () => {

    const [cleared, setCleared] = useState(null)

    useEffect(() => {
        if (!cleared) {
            (async () => {
                const response = await axios.get("http://localhost:8080/clearAllData")
                setCleared(response.data.response)
            })()
        }
    })

    const [rooms, setRooms] = useState()
    useEffect(() => {
        const createRoom = async (room) => {
            const response = await apolloClient.mutate({ mutation: SAVE_ROOM, variables: room })
            return response.data.saveRoom
        }
        if (cleared === "success") {
            (async () => {
                const theRooms = []
                theRooms.push(await createRoom({ id: 1, description: "Logo szoba" }))
                theRooms.push(await createRoom({ id: 2, description: "Vizsgáló" }))
                theRooms.push(await createRoom({ id: 3, description: "Torna szoba" }))
                setRooms(theRooms)
            })()
        }
    }, [cleared])

    const [therapyTypes, setTherapyTypes] = useState()
    useEffect(() => {
        const createTherapyType = async (therapyType) => {
            const response = await apolloClient.mutate({ mutation: SAVE_THERAPY_TYPE, variables: therapyType })
            return response.data.saveTherapyType
        }

        if (cleared === "success") {
            (async () => {
                const theTherapyTypes = []
                theTherapyTypes.push(await createTherapyType({ id: 1, description: "Beszédfejlesztés" }))
                theTherapyTypes.push(await createTherapyType({ id: 2, description: "Mozgásfejlesztés" }))
                setTherapyTypes(theTherapyTypes)
            })()
        }
    }, [cleared])

    const [therapyEventStates, setTherapyEventStates] = useState([])
    useEffect(() => {
        const createEventStatus = async (eventStatus) => {
            const response = await apolloClient.mutate({ mutation: SAVE_EVENT_STATE, variables: eventStatus })
            return response.data.saveTherapyEventState
        }
        if (cleared === "success") {
            (async () => {
                const theTherapyEventStates = []
                theTherapyEventStates.push(await createEventStatus({ id: 1, description: "Tervezett" }))
                theTherapyEventStates.push(await createEventStatus({ id: 2, description: "Megtartott" }))
                theTherapyEventStates.push(await createEventStatus({ id: 3, description: "Lemondott" }))
                setTherapyEventStates(theTherapyEventStates)
            })()
        }
    }, [cleared])

    const [therapyEventDurations, setTherapyEventDurations] = useState([])
    useEffect(() => {
        const createEventDuration = async (eventDuration) => {
            const response = await apolloClient.mutate({ mutation: SAVE_EVENT_DURATION, variables: eventDuration })
            return response.data.saveTherapyEventDuration
        }
        if (cleared === "success") {
            (async () => {
                const theTherapyEventDurations = []
                theTherapyEventDurations.push(await createEventDuration({ id: 1, description: "30 perc", minutes: 30 }))
                theTherapyEventDurations.push(await createEventDuration({ id: 2, description: "45 perc", minutes: 45 }))
                setTherapyEventDurations(theTherapyEventDurations)
            })()
        }
    }, [cleared])

    const [therapists, setTherapists] = useState()
    useEffect(() => {
        const createTherapist = async (therapist) => {
            const resp = await apolloClient.mutate({ mutation: SAVE_THERAPIST, variables: therapist })
            return resp.data.saveTherapist
        }

        if (cleared === "success") {
            (async () => {
                const theTherapists = []
                theTherapists.push(await createTherapist({ id: 1, name: "Fehér Kata", phone: "+36202459782", email: "fhrkata@gmail.com" }))
                theTherapists.push(await createTherapist({ id: 2, name: "Turcsik Anita", phone: "", email: "" }))
                setTherapists(theTherapists)
            })()
        }
    }, [cleared])

    const [families, setFamilies] = useState()
    useEffect(() => {

        const createFamily = async (family, clients) => {
            const familyResp = await apolloClient.mutate({ mutation: SAVE_FAMILY, variables: { name: family.name, familyId: 0 } })
            const newFamily = familyResp.data.updateFamily
            newFamily.clients = await Promise.all(
                clients.map(async (c) => {
                    const clientResp = await apolloClient.mutate({ mutation: SAVE_CLIENT, variables: { name: c.name, id: 0, familyId: newFamily.id } })
                    const newClient = clientResp.data.updateClient
                    newClient.timeTables = c.timeTables && await Promise.all(
                        c.timeTables.map(async (tt) => {
                            const timeTableResp = await apolloClient.mutate({
                                mutation: CREATE_TIME_TABLE, variables: {
                                    dayOfWeek: tt.dayOfWeek, fromTime: formatTime(tt.fromTime, true, true) + "+01:00", toTime: formatTime(tt.toTime, true, true) + "+01:00",
                                    therapyType: 1, room: 2, therapist: 1, clients: newClient.id
                                }
                            })
                            return timeTableResp.data.createTimeTableSlot
                        })
                    )
                    return newClient
                })
            )
            return newFamily
        }

        if (cleared === "success" && therapists && therapyTypes && rooms) {
            (async () => {
                const theFamilies = []
                theFamilies.push(await createFamily({ name: "Hervai" }, [
                    { name: "Hervai Bence", timeTables: [{ dayOfWeek: 1, fromTime: { hour: 14, min: 45 }, toTime: { hour: 15, min: 30 } }] },
                    { name: "Hervai Gergő", timeTables: [{ dayOfWeek: 4, fromTime: { hour: 13, min: 20 }, toTime: { hour: 14, min: 5 } }] }]))
                theFamilies.push(await createFamily({ name: "Muskovics" }, [{ name: "Muskovics Szandi", timeTables: [{ dayOfWeek: 1, fromTime: { hour: 13, min: 55 }, toTime: { hour: 14, min: 40 } }] }]))
                theFamilies.push(await createFamily({ name: "Sziebig" }, [{ name: "Sziebig Ricsi", timeTables: [{ dayOfWeek: 2, fromTime: { hour: 8, min: 55 }, toTime: { hour: 9, min: 40 } }, { dayOfWeek: 4, fromTime: { hour: 8, min: 55 }, toTime: { hour: 9, min: 40 } }] }]))
                theFamilies.push(await createFamily({ name: "Buzna" }, [
                    { name: "Buzna Balu", timeTables: [{ dayOfWeek: 1, fromTime: { hour: 15, min: 45 }, toTime: { hour: 16, min: 30 } }] },
                    { name: "Buzna Misi", timeTables: [{ dayOfWeek: 2, fromTime: { hour: 15, min: 45 }, toTime: { hour: 16, min: 30 } }] }]))
                theFamilies.push(await createFamily({ name: "Elek" }, [{ name: "Elek Ábel", timeTables: [{ dayOfWeek: 5, fromTime: { hour: 15, min: 45 }, toTime: { hour: 16, min: 30 } }] }]))
                theFamilies.push(await createFamily({ name: "Tolnai" }, [{ name: "Tolnai Lőrinc", timeTables: [{ dayOfWeek: 3, fromTime: { hour: 15, min: 0 }, toTime: { hour: 15, min: 45 } }] }]))
                theFamilies.push(await createFamily({ name: "Farkasházi" }, [{ name: "Farkasházi Kornél", timeTables: [{ dayOfWeek: 2, fromTime: { hour: 15, min: 5 }, toTime: { hour: 15, min: 35 } }] }]))
                theFamilies.push(await createFamily({ name: "Szabó" }, [{ name: "Szabó Atti", timeTables: [{ dayOfWeek: 1, fromTime: { hour: 8, min: 30 }, toTime: { hour: 9, min: 15 } }] }]))
                theFamilies.push(await createFamily({ name: "Deme" }, [{ name: "Deme Dóri", timeTables: [{ dayOfWeek: 5, fromTime: { hour: 8, min: 0 }, toTime: { hour: 8, min: 45 } }] }]))
                theFamilies.push(await createFamily({ name: "Székely" }, [{ name: "Székely Hanna", timeTables: [{ dayOfWeek: 3, fromTime: { hour: 16, min: 35 }, toTime: { hour: 17, min: 20 } }] }]))
                theFamilies.push(await createFamily({ name: "Nemes" }, [{ name: "Nemes Bence", timeTables: [{ dayOfWeek: 3, fromTime: { hour: 8, min: 0 }, toTime: { hour: 8, min: 45 } }] }]))
                theFamilies.push(await createFamily({ name: "Tálos" }, [{ name: "Tálos Bettina", timeTables: [{ dayOfWeek: 3, fromTime: { hour: 13, min: 30 }, toTime: { hour: 14, min: 0 } }] }]))
                theFamilies.push(await createFamily({ name: "Charaf" }, [{ name: "Charaf Klára", timeTables: [{ dayOfWeek: 4, fromTime: { hour: 10, min: 30 }, toTime: { hour: 11, min: 0 } }] }]))
                theFamilies.push(await createFamily({ name: "Párkányi" }, [{ name: "Párkányi Bence", timeTables: [{ dayOfWeek: 4, fromTime: { hour: 14, min: 10 }, toTime: { hour: 14, min: 55 } }] }]))
                theFamilies.push(await createFamily({ name: "Karászi" }, [{ name: "Karászi Gyöngyi", timeTables: [{ dayOfWeek: 2, fromTime: { hour: 14, min: 10 }, toTime: { hour: 14, min: 55 } }] }]))
                theFamilies.push(await createFamily({ name: "Dormán" }, [{ name: "Dormán Áron", timeTables: [{ dayOfWeek: 4, fromTime: { hour: 15, min: 10 }, toTime: { hour: 15, min: 55 } }] }]))
                theFamilies.push(await createFamily({ name: "Tóth-Oborni" }, [{ name: "Tóth-Oborni Dorka", timeTables: [{ dayOfWeek: 4, fromTime: { hour: 16, min: 0 }, toTime: { hour: 16, min: 30 } }] }]))
                theFamilies.push(await createFamily({ name: "Dobó" }, [{ name: "Dobó Domi", timeTables: [{ dayOfWeek: 5, fromTime: { hour: 8, min: 55 }, toTime: { hour: 9, min: 40 } }] }]))
                theFamilies.push(await createFamily({ name: "Höltzl" }, [
                    { name: "Höltzl Huba", timeTables: [{ dayOfWeek: 5, fromTime: { hour: 13, min: 0 }, toTime: { hour: 13, min: 45 } }] },
                    { name: "Höltzl Marci", timeTables: [{ dayOfWeek: 5, fromTime: { hour: 13, min: 55 }, toTime: { hour: 14, min: 40 } }] }]))
                theFamilies.push(await createFamily({ name: "Szabó" }, [{ name: "Szabó Barbara", timeTables: [{ dayOfWeek: 3, fromTime: { hour: 15, min: 45 }, toTime: { hour: 16, min: 30 } }] }]))
                theFamilies.push(await createFamily({ name: "Turcsik" }, [
                    { name: "Turcsik Levente", timeTables: [{ dayOfWeek: 2, fromTime: { hour: 13, min: 15 }, toTime: { hour: 14, min: 0 } }] },
                    { name: "Turcsik Magdi", timeTables: [{ dayOfWeek: 5, fromTime: { hour: 14, min: 50 }, toTime: { hour: 15, min: 35 } }] }]))
                theFamilies.push(await createFamily({ name: "Tátrai" }, [{ name: "Tátrai Anti", timeTables: [{ dayOfWeek: 3, fromTime: { hour: 14, min: 10 }, toTime: { hour: 14, min: 55 } }] }]))

                setFamilies(theFamilies)
            })()
        }
    }, [cleared, therapists, therapyTypes, rooms])

    return (
        <div className="contentwrapper">
            <p>{`ClearAllData: ${cleared}`}</p>
            <p>Szobák</p>
            <ul style={{ padding: "0 0 1rem 2rem" }} >
                {rooms && rooms.map((r, i) => <li key={i} >{r.description}</li>)}
            </ul>
            <p>Terápiatipusok</p>
            <ul style={{ padding: "0 0 1rem 2rem" }} >
                {therapyTypes && therapyTypes.map((tt, i) => <li key={i} >{tt.description}</li>)}
            </ul>
            <p>Alkalom státuszok</p>
            <ul style={{ padding: "0 0 1rem 2rem" }} >
                {therapyEventStates.map((tes, i) => <li key={i} >{tes.description}</li>)}
            </ul>
            <p>Alkalom időtartam</p>
            <ul style={{ padding: "0 0 1rem 2rem" }} >
                {therapyEventDurations.map((ted, i) => <li key={i} >{ted.description}</li>)}
            </ul>
            <p>Terapeuták</p>
            <ul style={{ padding: "0 0 1rem 2rem" }} >
                {therapists && therapists.map((t, i) => <li key={i} >{t.name}</li>)}
            </ul>
            <p>Családok</p>
            <ul style={{ padding: "0 0 1rem 2rem" }} >
                {families && families.map((f, i) => <li key={i} >{f.name}<ul>
                    {f.clients.length && f.clients.map((c, ci) => <li key={ci} style={{ marginLeft: "2em" }} >{c.name}
                        <ul>
                            {c.timeTables && c.timeTables.length && c.timeTables.map((tt, tti) =>
                                <li key={tti} style={{ marginLeft: "2em" }} >{`${days[tt.dayOfWeek - 1].description} ${formatTime(getHourAndMin(tt.fromTime))} - ${formatTime(getHourAndMin(tt.toTime))}`}</li>)}
                        </ul>
                    </li>)}
                </ul></li>)}
            </ul>
        </div>
    )
}