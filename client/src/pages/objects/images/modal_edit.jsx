import React, { useContext, useState} from 'react';
import { useForm } from "react-hook-form"
import { UserContext, TranslateContext } from '../../../contex';
import Type_1 from './type_1';
import Type_2 from './type_2';
import Type_3 from './type_3';

export const Modal_edit = ({entry, confirm_save_Entry , exit}) => {
/** Ролевая модель */
const {user} = useContext(UserContext)
const {translate} = useContext(TranslateContext)
console.log(entry)

/**Кнопка esc */
document.addEventListener('keydown', function(e) {if( e.key === 'Escape' ){ exit(); }});       
/** Создаем форму если запись указана то подставляем данные   */    
const {register, handleSubmit, formState:{errors}, setValue } = useForm({ defaultValues:{
  image_id:entry?.data[0]?.image_id,
  repository:entry?.data[0]?.repository,
  tag:entry?.data[0]?.tag,
  size:entry?.data[0]?.size,
},mode: 'onChange'});    
            const onSubmit = (data) =>{
            confirm_save_Entry(data,  entry?.data[0]?.images_id?  entry?.data[0]?.images_id : null)
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
              {translate('common.modal.edit')} &nbsp;
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
                        <label className="form-label">image_id</label>
                        <input
                        {...register('image_id', {
                          required:'Укажите имя пользователя',
                          maxLength: 50
                      })}
                      type="email" className="form-control"/>
                    </div>
              </div>
              <div className="col-sm-6">
                    <div className="input-group input-group-dynamic is-filled my-3 ">
                      <label className="form-label">repository</label>
                      <input 
                        {...register('repository', {
                          required:'Укажите мобильный телефон',
                          maxLength: 128
                      })}
                      type="text" className="form-control"/>
                    </div>
              </div>      
              <div className="col-sm-6">
                    <div className="input-group input-group-dynamic is-filled my-3 ">
                      <label className="form-label">tag</label>
                      <input 
                        {...register('tag', {
                          required:'Укажите мобильный телефон',
                          maxLength: 50
                      })}
                      type="text" className="form-control"/>
                    </div>
              </div>                    
              <div className="col-sm-6">
                    <div className="input-group input-group-dynamic is-filled my-3 ">
                      <label className="form-label">size</label>
                      <input 
                        {...register('size', {
                          required:'Укажите мобильный телефон',
                          maxLength: 50
                      })}
                      type="text" className="form-control"/>
                    </div>
              </div>
            </div>
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

