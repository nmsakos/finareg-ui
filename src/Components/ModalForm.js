import React from "react";
import { FormActionButtonBar } from "./FormActionButtonBar";

export const ModalForm = React.forwardRef(({ shouldShow, onModalSave, onModalCancel, onDeleteClick, entity, children }, ref) => {
    return shouldShow ? (
        <div className="modal-background" >
            <div className="modal-body" >
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { entity: entity, onSaveClick: onModalSave, onResetClick: onModalCancel, innerRef: ref });
                    }

                    return child;
                })}
                <FormActionButtonBar onSaveClick={onModalSave} onResetClick={onModalCancel} onRemoveClick={onDeleteClick} useButtons />
            </div>
        </div>
    ) : null;
})