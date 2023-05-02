import React, { useContext} from 'react';
import { useForm } from "react-hook-form"
import { UserContext } from '../../../contex';

export const Modal = ({entry, confirm_save_Entry , exit}) => {
   /** Ролевая модель */
const {user} = useContext(UserContext)
      //  console.log(entry?.places)
        console.log(entry)
         /**Кнопка esc */
         document.addEventListener('keydown', function(e) {if( e.key === 'Escape' ){ exit(); }});
       
         /** Создаем форму если запись указана то подставляем данные   */    
            const {register, handleSubmit, formState:{errors}, setValue
            } = useForm({
            defaultValues:{
              username:     entry?.data?.username && entry?.data?.username,
              birth_date:   entry?.data?.birth_date && entry?.data?.birth_date,
              phone_mob:    entry?.data?.phone_mob && entry?.data?.phone_mob,
              login:        entry?.data?.login && entry?.data?.login,
             // passwd:       entry?.data?.passwd && entry?.data?.passwd,
              email:        entry?.data?.email && entry?.data?.email,
              balance:      entry?.data?.balance && entry?.data?.balance,
              deposit_net:  entry?.data?.deposit_net && entry?.data?.deposit_net,
              deposit_wallet:  entry?.data?.deposit_wallet && entry?.data?.deposit_wallet,
              withdraw_net:  entry?.data?.withdraw_net && entry?.data?.withdraw_net,
              withdraw_wallet:  entry?.data?.withdraw_wallet && entry?.data?.withdraw_wallet,
              type_pnl:      entry?.data?.type_pnl && entry?.data?.type_pnl,
              rem:           entry?.data?.rem && entry?.data?.rem,
              enabled:       entry?.data?.enabled && entry?.data?.enabled
            },
                mode: 'onChange'
            });
            
            const onSubmit = (data) =>{
            confirm_save_Entry(data,  entry?.data?.user_id?  entry?.data?.user_id : null)
           }

return (
<div 
 onClick={e=>exit()}
style={{display: 'block', background: ' rgba(0,0,0,0.5)'}}
className="modal fade show " >
       <div class="modal-dialog modal-dialog-centered modal-lg " role="document" onClick={event =>{event.stopPropagation()}}>
        <div class="modal-content dark-version">
          <div class="modal-header">
          <h5 className="modal-title font-weight-normal">{entry?.data? 'Редактирование '  : 'Добавление '}пользователя</h5>
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
                        <label class="form-label">ФИО</label>
                        <input
                        {...register('username', {
                          required:'Укажите имя пользователя',
                          maxLength: 50
                      })}
                      type="email" class="form-control"/>
                    </div>
              </div>
              <div className="col-sm-4">
                    <div class="input-group input-group-dynamic is-filled my-3 ">
                        <label class="form-label">Дата рождения</label>
                        <input
                        {...register('birth_date')}
                      type="email" class="form-control"/>
                    </div>
              </div>      
              <div className="col-sm-4">
                    <div class="input-group input-group-dynamic is-filled my-3 ">
                      <label class="form-label">Телефон</label>
                      <input 
                        {...register('phone_mob', {
                          required:'Укажите мобильный телефон',
                          maxLength: 15
                      })}
                      type="email" class="form-control"/>
                    </div>
              </div>            
            </div>
            <div className="row">
               <div className="col-sm-4">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Логин</label>
                     <input 
                      {...register('login', {
                        required:'Укажите логин пользователя',
                        maxLength: 15
                     })}
                     type="email" class="form-control"/>
                  </div>
              </div>
              <div className="col-sm-4">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Пароль</label>
                     <input {...register('passwd')} 
                     type="password" class="form-control"/>
                  </div>
              </div>
              <div className="col-sm-4">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">E-mail</label>
                     <input {...register('email', {
                                        required:'Укажите E-mail',
                                        maxLength: 30
                      })} type="email" class="form-control"/>
                  </div>
              </div>
            </div>
            <div className="row">              
              <div className="col-sm-4">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Сеть ввода</label>
                     <input 
                     {...register('deposit_net')} 
                     type="email" class="form-control"/>
                  </div>
              </div>
              <div className="col-sm-8">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Кошелек ввода</label>
                     <input 
                     {...register('deposit_wallet')} 
                     type="email" class="form-control"/>
                  </div>
              </div>
            </div>
            <div className="row">              
              <div className="col-sm-4">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Сеть вывода </label>
                     <input 
                     {...register('withdraw_net')} 
                     type="email" class="form-control"/>
                  </div>
              </div>
              <div className="col-sm-8">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Кошелек вывода</label>
                     <input 
                     {...register('withdraw_wallet')} 
                     type="email" class="form-control"/>
                  </div>
              </div>
            </div>
            <div className="row">
               <div className="col-sm-4">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Задать баланс вручную </label>
                     <input 
                     {...register('balance')} 
                     type="number" class="form-control"/>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div class="input-group input-group-dynamic is-filled my-3 ">
                     <label class="form-label">Тип PNL</label>
                     <select className="form-control"                                        
                                        {...register('type_pnl', {
                                        required:'Укажите тип PNL'
                                        })}>                        
                      <option value={1} >Фиксированный</option>                                       
                      <option value={2} >Колеблющийся</option>       
                      </select>
                  </div>
                </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div class="input-group input-group-dynamic">
                    <textarea
                    {...register('rem')} 
                    class="multisteps-form__textarea form-control" rows="5" placeholder="Примечание..." />
                  </div>
              </div>
            </div>
         
            <div className="row">
            <div class="form-check form-check-info text-left">
              <br/>
            <input {...register('enabled')} class="form-check-input" type="checkbox" />
                    <label class="form-check-label" for="flexCheckDefault">
                    Пользователь активен
                    </label>
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

