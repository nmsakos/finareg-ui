import { useEffect, useState } from "react";
import { client } from "../../Config/ApolloProviderWithClient";
import { SAVE_FAMILY } from "../../GraphQL/Mutations/familyMutators";
import { isEqual } from "../../utils";

export const withEditableFamily = (Component) => {
    return props => {
        const input = props.family;
        const afterSave = props.afterSave;
        const [originalFamily, setOriginalFamily] = useState(null);
        const [family, setFamily] = useState(null);

        useEffect(() => {
            setFamily(input);
            setOriginalFamily(input);
        }, [input]);

        const isChanged = () => {
            return !family || family.id === 0 || !isEqual(family, originalFamily);
        }

        const onChangeFamily = changes => {
            setFamily({ ...family, ...changes });
        }

        const onResetFamily = () => {
            setFamily(originalFamily);
        }

        const onSaveFamily = async () => {
            const isNew = family.id === 0;
            const response = await client.mutate({
                mutation: SAVE_FAMILY,
                variables: {
                    familyId: family.id,
                    name: family.name
                }
            });
            setFamily(response.data.updateFamily);
            setOriginalFamily(response.data.updateFamily);
            if (isNew) {
                console.log(response.data.updateFamily.id);
                afterSave(response.data.updateFamily.id);
            }
        }

        return <Component {...props}
            family={family || input}
            onChangeFamily={onChangeFamily}
            onSaveFamily={onSaveFamily}
            onResetFamily={onResetFamily}
            isChanged={isChanged} />
    }
}