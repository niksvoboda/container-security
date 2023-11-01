import React, { useContext, useEffect, useState} from 'react';
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

const [scaner, set_scaner] = useState("nimscan")
const scaners = [
    {value: 'nmap', name: 'Расширенное сканирование'},
    {value: 'nimscan', name: 'Ускоренное сканирование'},
  ]
const nmap_options = [
    {value: '-a', name: 'Cкан по всем портам'},
    {value: '-r', name: 'Cкан по портам docker'},
    {value: '-m', name: 'Cкан по определенным портам'},
    {value: '-i', name: 'Cкан по всем интерфейсам'},
  ]
const nimscan_options = [
    {value: '-r', name: 'Cкан по портам docker'},
    {value: '-i', name: 'Cкан по всем интерфейсам'},
  ]  
const host_options = [
    {value: '-k', name: 'IP'},
    {value: '-w', name: 'Диапазон IP'},
    {value: '-x', name: 'IP/mask'},
  ]  
const [options, set_options] = useState(nmap_options)

useEffect(()=>{
    if (scaner == 'nmap') {
        set_options(nmap_options)
    } else {
        set_options(nimscan_options)
    }
},[scaner])

return (
<>
    <div className="row">
        <div className="col-sm-6">
            <div className="input-group input-group-dynamic is-filled my-3 ">
            <label className="form-label">Название задачи</label>            
            <input
            {...register('title', { maxLength: 500})}
            type="email" className="form-control"/>
            </div>
        </div>
     </div>
     <div className="row">
        <div className="col-sm-6">
            <div className="input-group input-group-dynamic is-filled my-3 ">
            <label className="form-label">Тип сканирования</label>                       
            <select
                    {...register('scaner', { maxLength: 500})}
                    value={scaner}
                    onChange={event => set_scaner(event.target.value)}
                    type="text" className="form-control dark-version">
                    {scaners.map(p=>
                    <option value={p.value}>{p.name}</option>
                    )}          
            </select>
        </div>
    </div>
    </div>
        <div className="row">
            <div className="col-sm-6">
                <div className="input-group input-group-dynamic is-filled my-3 ">
                <label className="form-label">Задача для сканера</label>                       
                    <select     
                        {...register('task_type', { maxLength: 500})}
                        type="email" className="form-control dark-version">
                        {options.map(p=>
                        <option value={p.value}>{p.name}</option>
                        )}          
                    </select>
                </div>
            </div> 
        </div>
        <div className="row">
            <div className="col-sm-6">
                <div className="input-group input-group-dynamic is-filled my-3 ">
                <label className="form-label">Тип указания адреса</label>                       
                    <select     
                        {...register('task_type', { maxLength: 500})}
                        type="email" className="form-control dark-version">
                        {host_options.map(p=>
                        <option value={p.value}>{p.name}</option>
                        )}          
                    </select>
                </div>
            </div> 
        </div>
        <div className="row">             
            <div className="col-sm-6">
                <div className="input-group input-group-dynamic is-filled my-3 ">
                <label className="form-label">Указать IP или сеть с маской</label>
                <input
                {...register('ip_mask', {
                required:'Укажите имя пользователя',
                maxLength: 50
                })}
                type="email" className="form-control"/>
                </div>
            </div>                     
        </div>
            <div className="row">
                <div className="form-check form-check-info text-left">
                <input {...register('execute_analysis')} className="form-check-input" type="checkbox" />
                    <label className="form-check-label" for="flexCheckDefault">Производить анализ</label>
                </div>
            </div>
            <div className="row">
                <div className="form-check form-check-info text-left">
                <input {...register('use_alt_scan')} className="form-check-input" type="checkbox" />
                        <label className="form-check-label" for="flexCheckDefault">Использовать альтернативное сканирование</label>
                </div>
            </div>
            <div className="row">
            <div className="modal-footer">
                <button 
                onClick={e=>exit()}
                type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Отмена</button>
                <button 
                onClick={handleSubmit(onSubmit)}
                type="button" className="btn bg-gradient-primary">Отправить</button>
            </div>
        </div>
     </>
    );
};

export default Modal_1;