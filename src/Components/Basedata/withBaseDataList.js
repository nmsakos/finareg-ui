import React, { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import { client } from "../../Config/ApolloProviderWithClient"

export const withBaseDataList = (Component, LOAD, SAVE, queryName, headerText) => {
    return props => {
        const [list, setList] = useState(null)
        const [shouldShowModal, setShouldShowModal] = useState(false)
        const [updated, setUpdated] = useState(null)
        const [inUpdate, setInUpdate] = useState(null)
        const [forceUpdate, setForceUpdate] = useState(0)
        const qName = "get" + queryName[0].toUpperCase()+queryName.slice(1)
console.log(qName);
        const onModalSave = () => {
            const entity = inUpdate;
            setUpdated(entity)
            setShouldShowModal(false)
        }

        const onModalCancel = () => setShouldShowModal(false)

        useEffect(() => {
            console.log("updated");
            if (updated) {
                (async () => {
                    var variables = updated;
                    console.log(variables);
                    await client.mutate({ mutation: SAVE, variables: variables, updateQueries: [qName] })
                    setUpdated(null)
                    setForceUpdate(forceUpdate + 1)
                })()
            }
        }, [updated, forceUpdate, qName])


        const newEntityId = () => {
            const max = Math.max.apply(Math, list.map((entity) => parseInt(entity.id)))
            console.log(max);
            return max + 1
        }

        useEffect(() => {
            if (queryName) {
                (async () => {
                    const response = await client.query({
                        query: LOAD
                    });
                    setList(response.data[queryName]);
                })();
            }
        })

        const onChange = (changes) => {
            setInUpdate({...inUpdate, ...changes})
        }

        const getInUpdate = () => inUpdate

        return list ? <Component {...props}
            list={list}
            headerText={headerText}
            shouldShowModal={shouldShowModal}
            setShouldShowModal={setShouldShowModal}
            onModalSave={onModalSave}
            onModalCancel={onModalCancel}
            newEntityId={newEntityId}
            onChange={onChange}
            setInUpdate={setInUpdate}
            getInUpdate={getInUpdate}
        /> : null
    }
}