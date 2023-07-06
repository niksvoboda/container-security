import React, { useContext} from 'react';
import { useForm } from "react-hook-form"
import { UserContext, TranslateContext } from '../../../contex';

const Modal_1 = ({exit, confirm_save_Entry}) => {
/** Ролевая модель */
const {user} = useContext(UserContext)
const {translate} = useContext(TranslateContext)
/** Создаем форму если запись указана то подставляем данные   */    
const {register, handleSubmit, formState:{errors}, setValue} = useForm({ defaultValues:{
    task_type: '1'
}, mode: 'onChange'});            
const onSubmit = (data) =>{
confirm_save_Entry(data,  null)
}
return (
     <>
     <div className="row">              
              <div className="col-sm-6">
                    <div class="input-group input-group-dynamic is-filled my-3 ">
                        <label class="form-label">Указать IP или сеть с маской</label>
                        <input
                        {...register('ip_mask', {
                          required:'Укажите имя пользователя',
                          maxLength: 50
                      })}
                      type="email" class="form-control"/>
                    </div>
              </div>                     
            </div>
            <div className="row">
                <div class="form-check form-check-info text-left">
                <input {...register('execute_analysis')} class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="flexCheckDefault">Производить анализ</label>
                </div>
            </div>
            <div className="row">
                <div class="form-check form-check-info text-left">
                <input {...register('use_alt_scan')} class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="flexCheckDefault">Использовать альтернативное сканирование</label>
                </div>
            </div>
            <div className="row">
            <div class="modal-footer">
                <button 
                onClick={e=>exit()}
                type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Отмена</button>
                <button 
                onClick={handleSubmit(onSubmit)}
                type="button" class="btn bg-gradient-primary">Отправить</button>
            </div>
        </div>
     </>
    );
};

export default Modal_1;