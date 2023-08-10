import React, { useContext} from 'react';
import { useForm } from "react-hook-form"
import { UserContext, TranslateContext } from '../../../contex';

const Modal_2 = ({exit, confirm_save_Entry}) => {
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
         <label class="form-label">Название задачи</label>
         <input
         {...register('title', { maxLength: 500})}
         type="email" class="form-control"/>
      </div>
    </div>
    </div>
     <div className="row">              
              <div className="col-sm-6">
                    <div class="input-group input-group-dynamic is-filled my-3 ">
                        <label class="form-label">Указать API URL, либо IP</label>
                        <input
                        {...register('api_url', {
                          required:'Укажите имя пользователя',
                          maxLength: 50
                        })}
                      type="email" class="form-control"/>
                    </div>
              </div>                     
            </div>
               <div className="row">
                <div class="form-check form-check-info text-left">
                <input {...register('import_images')} class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="flexCheckDefault">Импорт образов</label>
                </div>
            </div>
            <div className="row">
                <div class="form-check form-check-info text-left">
                <input {...register('import_containers')} class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="flexCheckDefault">Импорт контейнеров</label>
                </div>
            </div>
            <div className="row">
                <div class="form-check form-check-info text-left">
                <input {...register('import_extended')} class="form-check-input" type="checkbox" />
                        <label class="form-check-label" for="flexCheckDefault">Расширенный импорт</label>
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

export default Modal_2;