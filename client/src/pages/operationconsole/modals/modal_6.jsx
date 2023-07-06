import React, { useContext} from 'react';
import { useForm } from "react-hook-form"
import { UserContext, TranslateContext } from '../../../contex';
import Modal_footer from './modal_footer';

const Modal_6 = ({exit, confirm_save_Entry}) => {
/** Ролевая модель */
const {user} = useContext(UserContext)
const {translate} = useContext(TranslateContext)
/** Создаем форму если запись указана то подставляем данные   */    
const {register, handleSubmit, formState:{errors}, setValue} = useForm({ defaultValues:{
    task_type: '2'
}, mode: 'onChange'});            
const onSubmit = (data) =>{
confirm_save_Entry(data,  null)
}
const options = [
    {value: '0', name: 'Нет'},
    {value: '1', name: 'OpenShift'},
    {value: '2', name: 'Kubernetis'},
    {value: '3', name: 'K3s'},
    {value: '4', name: 'DockerSwarm'},
  ]

  
return (
<>
<div className="row">
   <div className="col-sm-6">
      <div class="input-group input-group-dynamic is-filled my-3 ">
         <label class="form-label">Выбрать оркестратор</label>
         <select {...register('orchestrator')}
         type="email" class="form-control dark-version">
         {options.map(p=>
         <option value={p.value}>{p.name}</option>
         )}                
         </select> 
      </div>
   </div>
</div>
<div className="row">
   <div className="col-sm-6">
      <div class="input-group input-group-dynamic is-filled my-3 ">
         <label class="form-label">Выбрать образ</label>
         <select {...register('orchestrator')}
         type="email" class="form-control dark-version">
         {options.map(p=>
         <option value={p.value}>{p.name}</option>
         )}                
         </select> 
      </div>
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
</>    );
};

export default Modal_6;