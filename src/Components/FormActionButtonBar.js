import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FormActionButtonBar = ({onSaveClick, onResetClick, onRemoveClick, useButtons}) => {
    return useButtons ? 
    (
        <div className="svg-buttonbar">
            {onSaveClick && (<button className="button-new-resource" onClick={onSaveClick} ><FontAwesomeIcon icon="save" />Mentés</button>)}
            {onResetClick && (<button className="button-new-resource" onClick={onResetClick} ><FontAwesomeIcon icon="undo"/>Mégsem</button>)}
            {onRemoveClick && (<button className="button-new-resource" onClick={onRemoveClick} ><FontAwesomeIcon icon="trash" />Törlés</button>)}
        </div>
    )
    : (
        <div className="svg-buttonbar">
            {onSaveClick && (<FontAwesomeIcon icon="save" onClick={onSaveClick} />)}
            {onResetClick && (<FontAwesomeIcon icon="undo" onClick={onResetClick} />)}
            {onRemoveClick && (<FontAwesomeIcon icon="trash" onClick={onRemoveClick} />)}
        </div>
    );
}