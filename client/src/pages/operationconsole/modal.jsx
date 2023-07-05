import React, { useContext, useState, useEffect} from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../contex';
import Modal_1 from './modals/modal_1';
import Modal_2 from './modals/modal_2';
import Modal_3 from './modals/modal_3';
import Modal_4 from './modals/modal_4';
import Modal_5 from './modals/modal_5';
import Modal_6 from './modals/modal_6';

export const Modal = ({entry, confirm_save_Entry , exit}) => {
/** Ролевая модель */
const {user} = useContext(UserContext)
const [type_task, set_type_task] = useState('1')
const [form, set_form] = useState(<Modal_1/>)
//console.log(entry)
/**Кнопка esc */
document.addEventListener('keydown', function(e) {if( e.key === 'Escape' ){ exit(); }});
/** Создаем форму если запись указана то подставляем данные */    
function form_type (type_task){
  switch(type_task){
    case '1' :
      return  <Modal_1/>   
    case '2' :
      return  <Modal_2/>
    case '3' :
      return  <Modal_3/>
    case '4' :
      return  <Modal_4/>  
    case '5' :
      return  <Modal_5/>  
    case '6' :
      return  <Modal_6/>    
    default:
      return null;      
  }
}
useEffect(() => {
  set_form(form_type (type_task));
  console.log(type_task)
  console.log(form_type (type_task))
}, [type_task]);

return (
<div 
 onClick={e=>exit()}
style={{display: 'block', background: ' rgba(0,0,0,0.5)'}}
className="modal fade show " >
       <div class="modal-dialog modal-dialog-centered modal-lg" role="document" onClick={event =>{event.stopPropagation()}}>
        <div class="modal-content dark-version">
          <div class="modal-header">
          <h5 className="modal-title font-weight-normal">Создание задачи</h5>
            <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"              
               onClick={e=>exit()}
              >×</span>
            </button>
          </div>
          <div class="modal-body">
            <div className="row">              
              <div className="col-sm-4">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                      <label class="form-label">Тип задачи</label>
                      <select onChange={event => set_type_task(event.target.value)}
                      type="email" class="form-control dark-version">
                            <option value={1}>Сканирование сети</option>
                            <option value={2}>Импорт API</option>
                            <option value={3}>Импорт из директории</option>
                            <option value={4}>Проверка лучших практик</option>
                            <option value={5}>Сканирование контейнеров</option>
                            <option value={6}>Сканирование образов</option>
                      </select>                      
                  </div>
              </div>                     
            </div>
            <div className="row">              
              <div className="col-12">
                 {form}
              </div>                     
            </div>
          </div>
          <div class="modal-footer">
            <button 
            onClick={e=>exit()}
            type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Отмена</button>
            <button 
           // onClick={handleSubmit(onSubmit)}
            type="button" class="btn bg-gradient-primary">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
        );
    }

