import React, { useContext} from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../../contex';

export const Modal = ({entry, confirm_save_Entry , exit}) => {
/** Ролевая модель */
const {user} = useContext(UserContext)
       console.log(entry)
        console.log(entry)
         /**Кнопка esc */
         document.addEventListener('keydown', function(e) {if( e.key === 'Escape' ){ exit(); }});
       
         /** Создаем форму если запись указана то подставляем данные   */    
            const {register, handleSubmit, formState:{errors}, setValue
            } = useForm({
            defaultValues:{
              ad_role_id:     entry?.data?.ad_role_id && entry?.data?.ad_role_id,
              title:          entry?.data?.title && entry?.data?.title,
              ad_groupname:   entry?.data?.ad_groupname && entry?.data?.ad_groupname,          
              local_role_id:  entry?.data?.local_role_id && entry?.data?.local_role_id,             
            },
                mode: 'onChange'
            });
            
            const onSubmit = (data) =>{
            confirm_save_Entry(data,  entry?.data?.ad_role_id?  entry?.data?.ad_role_id : null)
           }

return (
<div 
 onClick={e=>exit()}
style={{display: 'block', background: ' rgba(0,0,0,0.5)'}}
className="modal fade show " >
       <div class="modal-dialog modal-dialog-centered modal-lg " role="document" onClick={event =>{event.stopPropagation()}}>
        <div class="modal-content dark-version">
          <div class="modal-header">
          <h5 className="modal-title font-weight-normal">{entry?.data? 'Редактирование ' : 'Добавление '}привязки</h5>
            <button type="button" class="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"              
               onClick={e=>exit()}
              >×</span>
            </button>
          </div>
          <div class="modal-body">
            <div className="row">              
              <div className="col-sm-12">
                    <div class="input-group input-group-dynamic is-filled my-3 ">
                        <label class="form-label">Название</label>
                        <input
                        {...register('title', {
                          required:'Укажите название',
                          maxLength: 50
                      })}
                      type="text" class="form-control"/>
                    </div>
              </div>                      
            </div>           
            <div className="row">              
              <div className="col-sm-6">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Имя группы в AD</label>
                     <input 
                     {...register('ad_groupname', {
                      required:'Укажите название',
                      maxLength: 50
                      })} 
                     type="text" class="form-control"/>
                  </div>
              </div>              
              <div className="col-sm-6">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Локальная группа</label>
                     <select className="form-control dark-version"
                    {...register("local_role_id")}>
                    {entry?.roles &&
                    entry.roles.map(r=>
                    <option 
                    value={r.role_id} 
                    style={{backgroundColor:'#black'}}
                    key={entry?.roles.indexOf(r)}>{r.title}
                    </option>
                    )}
                    </select>
                  </div>
              </div>
            </div>  
          </div>
          <div class="modal-footer">
            <button 
            onClick={e=>exit()}
            type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Отмена</button>
            <button 
            onClick={handleSubmit(onSubmit)}
            type="button" class="btn bg-gradient-primary">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
        );
    }

