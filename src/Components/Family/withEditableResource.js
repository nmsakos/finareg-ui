import { useEffect, useState } from "react"
import { client } from "../../Config/ApolloProviderWithClient";
import { isEqual } from "../../utils";

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const withEditableResource = (Component, resourceName, LOAD_RESOURCE, SAVE_RESOURCE, REMOVE_RESOURCE) => {
    return props => {
        const resourceId = props[resourceName].id;
        const familyId = props[resourceName].familyId;
        const [originalData, setOriginalData] = useState(props[resourceName]);
        const [data, setData] = useState(props[resourceName]);
        
        useEffect(() => {
            if (resourceId) {
                (async () => {
                    const response = await client.query({
                        query: LOAD_RESOURCE,
                        variables: { id: resourceId }
                    });
                    setData(response.data[resourceName]);
                    setOriginalData(response.data[resourceName]);
                })();
            }
            else {
                const newResource = { id: 0, familyId: familyId };
                setData(newResource);
                setOriginalData(newResource);
            }
        }, [resourceId, familyId]);

        const onChange = changes => {
            setData({ ...data, ...changes });
        }

        const isChanged = () => {
            return !data || data.id === 0 || !isEqual(data, originalData);
        }

        const onReset = () => {
            setData(originalData);
        }

        const onSave = async () => {
            const response = await client.mutate({
                mutation: SAVE_RESOURCE,
                variables: {
                    id: data.id,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    familyId: data.familyId
                }
            });
            const updated = response.data[`update${capitalize(resourceName)}`];
            setData(updated);
            setOriginalData(updated);
        }

        const onRemove = async () => {
            const response = await client.mutate({
                mutation: REMOVE_RESOURCE,
                variables: { id: data.id }
            });
            if (response.data[`remove${capitalize(resourceName)}`]) {
                setData(null);
                setOriginalData(null);
            }
        }

        const resourceProps = {
            [resourceName]: data,
            [`onChange${capitalize(resourceName)}`]: onChange,
            [`onSave${capitalize(resourceName)}`]: onSave,
            [`onReset${capitalize(resourceName)}`]: onReset,
            [`onRemove${capitalize(resourceName)}`]: onRemove,
            isChanged: isChanged
        }

        return <Component {...props}
            {...resourceProps} />
    }
}