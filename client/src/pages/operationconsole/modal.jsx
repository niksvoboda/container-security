import React, { useContext, useState, useEffect} from 'react';
import { useForm } from "react-hook-form"
import { UserContext, TranslateContext } from '../../contex';
import Modal_1 from './modals/modal_1';
import Modal_2 from './modals/modal_2';
import Modal_3 from './modals/modal_3';
import Modal_4 from './modals/modal_4';
import Modal_5 from './modals/modal_5';
import Modal_6 from './modals/modal_6';

export const Modal = ({entry, confirm_save_Entry , exit}) => {
/** Ролевая модель */
const {user} = useContext(UserContext)
const {translate} = useContext(TranslateContext)
const [type_task, set_type_task] = useState("1")
const [form, set_form] = useState(<Modal_1/>)
//console.log(entry)
/**Кнопка esc */
document.addEventListener('keydown', function(e) {if( e.key === 'Escape' ){ exit(); }});
/** Создаем форму если запись указана то подставляем данные */    
function form_type (type_task){
  switch(type_task){
    case '0' :
      return  <Modal_1 exit = {exit} confirm_save_Entry = {confirm_save_Entry}/>   
    case '1' :
      return  <Modal_2 exit = {exit} confirm_save_Entry = {confirm_save_Entry}/>
    case '2' :
      return  <Modal_3 exit = {exit} confirm_save_Entry = {confirm_save_Entry}/>
    case '3' :
      return  <Modal_4 exit = {exit} confirm_save_Entry = {confirm_save_Entry}/>  
    case '4' :
      return  <Modal_5 exit = {exit} confirm_save_Entry = {confirm_save_Entry}/>  
    case '5' :
      return  <Modal_6 exit = {exit} confirm_save_Entry = {confirm_save_Entry}/>    
    default:
      return null;      
  }
}

const options = [
  {value: 0, name: 'Сканирование сети'},
  {value: 1, name: 'Импорт API'},
  {value: 2, name: 'Импорт из директории'},
  {value: 3, name: 'Проверка лучших практик'},
  {value: 4, name: 'Сканирование контейнеров'},
  {value: 5, name: 'Сканирование образов'},
]
useEffect(() => {
  set_form(form_type(type_task, exit));
  console.log(type_task)
  console.log(form_type(type_task))
}, [type_task]);

return (
<div 
onClick={e=>exit()}
style={{display: 'block', background: ' rgba(0,0,0,0.5)'}}
className="modal fade show " >
       <div class="modal-dialog modal-dialog-centered modal-lg" role="document" onClick={event =>{event.stopPropagation()}}>
        <div class="modal-content dark-version">
          <div class="modal-header">
          <h5 className="modal-title font-weight-normal">Создание задачи "{options[type_task].name}"</h5>
            <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"              
               onClick={e=>exit()}
              >×</span>
            </button>
          </div>
          <div class="modal-body">
            <div className="row">              
              <div className="col-sm-6">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                      <label class="form-label">Тип задачи</label>
                      <select
                      value={type_task}
                      onChange={event => set_type_task(event.target.value)}
                      type="email" class="form-control dark-version">
                          {options.map( p=>
                              <option value={p.value}>{p.name}</option>
                          )}                         
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
        </div>
      </div>
    </div>
        );
    }

