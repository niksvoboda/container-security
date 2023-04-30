import React from 'react';
export const ModalDelete = ({entry_id, confirm_delete_Entry, exit}) => {
/**Кнопка esc */
document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape') {
      exit();
   }
});
    return (
        <div className="modal show background_modals"  wfd-invisible="true" style={{display: 'block',display: 'block', background: ' rgba(0,0,0,0.5)'}} aria-modal="true" role="dialog"
        onClick={event =>exit()}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Внимание!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">Вы уверены, что хотите удалить?</div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-sm btn-secondary w-20 mx-2" data-bs-dismiss="modal"
                        onClick={event =>exit()}
                        >Нет</button>
                        <button type="button" className="btn btn-sm btn-primary w-20 mx-2" data-bs-dismiss="modal"
                        onClick={event => confirm_delete_Entry(entry_id) }
                        >Да</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
