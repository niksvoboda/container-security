import React, { useContext} from 'react';
import { useForm } from "react-hook-form"
import { UserContext, TranslateContext } from '../../../contex';

export const Modal = ({entry, confirm_save_Entry , exit}) => {
   /** Ролевая модель */
const {user} = useContext(UserContext)
const {translate} = useContext(TranslateContext)
       console.log(entry)
        console.log(entry)
         /**Кнопка esc */
         document.addEventListener('keydown', function(e) {if( e.key === 'Escape' ){ exit(); }});
         let permissions = JSON.parse( entry?.data[0]?.permissions ? entry?.data[0]?.permissions : '{}')
         /** Создаем форму если запись указана то подставляем данные   */    
            const {register, handleSubmit, formState:{errors}, setValue
            } = useForm({
            defaultValues:{
              title:                  entry?.data[0]?.title && entry?.data[0]?.title,
              dashboards_read:        permissions?.dashboards_read && permissions?.dashboards_read,              
              dashboards_edit:        permissions?.dashboards_edit && permissions?.dashboards_edit,
              vulnerabilities_read:   permissions?.vulnerabilities_read && permissions?.vulnerabilities_read,              
              vulnerabilities_edit:   permissions?.vulnerabilities_edit && permissions?.vulnerabilities_edit,
              bestpractice_read:      permissions?.bestpractice_read && permissions?.bestpractice_read,              
              bestpractice_edit:      permissions?.bestpractice_edit && permissions?.bestpractice_edit,
              scheduledjobs_read:     permissions?.scheduledjobs_read && permissions?.scheduledjobs_read,              
              scheduledjobs_edit:     permissions?.scheduledjobs_edit && permissions?.scheduledjobs_edit,
              settings_read:          permissions?.settings_read && permissions?.settings_read,              
              settings_edit:          permissions?.settings_edit && permissions?.settings_edit,
              reports_read:           permissions?.reports_read && permissions?.reports_read,              
              reports_edit:           permissions?.reports_edit && permissions?.reports_edit,
//              _read:        permissions?._read && permissions?._read,              
//              _edit:        permissions?._edit && permissions?._edit,
            },
                mode: 'onChange'
            });
            
            const onSubmit = (data) =>{
            confirm_save_Entry(data,  entry?.data[0]?.role_id?  entry?.data[0]?.role_id : null)
           }

return (
<div 
   onClick={e=>
   exit()}
   style={{display: 'block', background: ' rgba(0,0,0,0.5)'}}
   className="modal fade show " >
   <div class="modal-dialog modal-dialog-centered modal-xs " role="document" onClick={event =>
      {event.stopPropagation()}}>
      <div class="modal-content dark-version">
         <div class="modal-header">
            <h5 className="modal-title font-weight-normal">
              {entry?.data[0]?  translate('common.modal.edit') : translate('common.modal.add') } &nbsp;
             {translate('settings.roles.modal.title')}</h5>
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
                     <label class="form-label">{translate('common.columns.title')}</label>
                     <input
                     {...register('title', {
                     required:'Укажите имя пользователя',
                     maxLength: 20
                     })}
                     type="email" class="form-control" maxLength={20}/>
                  </div>
               </div>
               <div className="col-sm-12 col">
                  <table className="table table-flush dataTable-table" id="datatable-search">
                     <thead className="thead-light">
                        <tr>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >{translate('common.columns.partition')}
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="40px">
                              <i className="material-icons">edit</i>
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="40px">
                              <i className="material-icons">delete</i>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >{translate('settings.roles.modal.dashboards')}
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('dashboards_read')} class="form-check-input" type="checkbox" />
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('dashboards_edit')} class="form-check-input" type="checkbox" />
                           </th>
                        </tr>
                        <tr>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >{translate('settings.roles.modal.vulnerabilities')}
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('vulnerabilities_read')} class="form-check-input" type="checkbox" />
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('vulnerabilities_edit')} class="form-check-input" type="checkbox" />
                           </th>
                        </tr>
                        <tr>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >{translate('settings.roles.modal.bestpractice')}
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('bestpractice_read')} class="form-check-input" type="checkbox" />
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('bestpractice_edit')} class="form-check-input" type="checkbox" />
                           </th>
                        </tr>
                        <tr>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >{translate('settings.roles.modal.scheduledjobs')}
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('scheduledjobs_read')} class="form-check-input" type="checkbox" />
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('scheduledjobs_edit')} class="form-check-input" type="checkbox" />
                           </th>
                        </tr>
                        <tr>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >{translate('settings.roles.modal.settings')}
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('settings_read')} class="form-check-input" type="checkbox" />
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('settings_edit')} class="form-check-input" type="checkbox" />
                           </th>
                        </tr>
                        <tr>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >{translate('settings.roles.modal.reports')}
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('reports_read')} class="form-check-input" type="checkbox" />
                           </th>
                           <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              <input {...register('reports_edit')} class="form-check-input" type="checkbox" />
                           </th>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <button 
               onClick={e=>exit()}
            type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">{ translate('common.buttons.cancel')}</button>
            <button 
               onClick={handleSubmit(onSubmit)}
               type="button" class="btn bg-gradient-primary">{ translate('common.buttons.save')}</button>
         </div>
      </div>
   </div>
</div>
        );
    }

