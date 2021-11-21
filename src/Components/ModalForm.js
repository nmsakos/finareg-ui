import React from "react";
import { FormActionButtonBar } from "./FormActionButtonBar";

export const ModalForm = React.forwardRef(({ shouldShow, onModalSave, onModalCancel, onDeleteClick, entity, children }, ref) => {
    return shouldShow ? (
        <div className="modal-background" >
            <div className="modal-body" >
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {innerRef: ref, ...child.props });
                    }
                    return child;
                })}
                <FormActionButtonBar onSaveClick={onModalSave} onResetClick={onModalCancel} onRemoveClick={onDeleteClick} useButtons />
            </div>
        </div>
    ) : null;
})