import React, { useContext, useState} from 'react';
import { useForm } from "react-hook-form"
import { UserContext, TranslateContext } from '../../../contex';
import Type_1 from './type_1';
import Type_2 from './type_2';
import Type_3 from './type_3';

export const Modal = ({entry, confirm_save_Entry , exit}) => {
   /** Ролевая модель */
   const {user} = useContext(UserContext)
   const {translate} = useContext(TranslateContext)
   const [type, set_type] = useState(2)

         /**Кнопка esc */
         document.addEventListener('keydown', function(e) {if( e.key === 'Escape' ){ exit(); }});       
         /** Создаем форму если запись указана то подставляем данные   */    
            const {register, handleSubmit, formState:{errors}, setValue } = useForm({ defaultValues:{},mode: 'onChange'});    
            const onSubmit = (data) =>{
            confirm_save_Entry(data, null)
           }

return (
<div 
onClick={e=>exit()}
style={{display: 'block', background: ' rgba(0,0,0,0.5)'}}
className="modal fade show " >
       <div className="modal-dialog modal-dialog-centered modal-lg " role="document" onClick={event =>{event.stopPropagation()}}>
        <div className="modal-content dark-version">
          <div className="modal-header">
          <h5 className="modal-title font-weight-normal">
              {translate('common.modal.add') } &nbsp;
              {translate('objects.images.modal_title')}</h5>         
              <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"              
               onClick={e=>exit()}
              >×</span>
            </button>
          </div>
          <div className="modal-body">
          <div className="row">  
              <div className="col-sm-6">
                  <div className="input-group input-group-dynamic is-filled my-3 ">
                     <label className="form-label">Тип добавления</label>
                     <select className="form-control select-hooks"
                           {...register('type', {
                            required:'Укажите имя пользователя',
                            maxLength: 50
                        })}
                     defaultValue={type}
                     onChange={e=> set_type(e.target.value)}>                 
                    <option  value={1} >Простое добавление</option>
                    <option  value={2} >Загрузка из файла</option>   
                    <option  value={3} >Парсинг API</option>                       
                    </select>
                  </div>
              </div>
            </div>
            {type == 1 && <Type_1
            register={register}
            />}
            {type == 2 && <Type_2
            setValue={setValue}
            />}            
            {type == 3 && <Type_2
            register={register}
            />}
           </div>
          <div className="modal-footer">
            <button 
            onClick={e=>exit()}
            type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">{translate('common.buttons.cancel')}</button>
            <button 
            onClick={handleSubmit(onSubmit)}
            type="button" className="btn bg-gradient-primary">{translate('common.buttons.save')}</button>
          </div>
        </div>
      </div>
    </div>
        );
    }

