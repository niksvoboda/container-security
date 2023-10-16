import React, { useState ,useEffect, useContext} from 'react';
import { fetchEntry, updateEntry} from "../../../http/api_ldaps_settings";
import { useSnackbar } from 'react-simple-snackbar'
import { option_green_snackbar, option_red_snackbar } from '../../../components/UI/kit/Snackbar';
import { UserContext, TranslateContext } from '../../../contex';
import { useForm } from "react-hook-form"

const LdapSettings = () => {

/** Создаем форму если запись указана то подставляем данные   */    
const {register, handleSubmit, formState:{errors}, setValue
} = useForm({
defaultValues:{},
    mode: 'onChange'
});   

/** Ролевая модель */
const {user} = useContext(UserContext)
const {translate} = useContext(TranslateContext)
/** Всплывающее сообщение */
const [openGreen, closeGreen] = useSnackbar(option_green_snackbar)
const [openRed, closeRed] = useSnackbar(option_red_snackbar)
const [content, setContent] = useState(null);

/** Обновляем содержимое при изменении параметров выборки */ 
const [refreshContent, set_refreshContent] = useState(false)

//Получение контента и общего количества записей из бд
useEffect(()=>{
   fetchEntry()
   .then((content) => {
      console.log(content)
      setContent(content?.data)
   })
    .catch((err) => {console.error(err);})
},[refreshContent])

/** Устанавливаем поля ввода */
const [url, set_url] = useState('');
const [username, set_username] = useState('');
const [password, set_password] = useState('');
const [baseDN, set_baseDN] = useState('');
useEffect(()=>{
   if(content){
    //  set_url(content.url)
    //  set_username(content.username)
     // set_password(content.password)
    //  set_baseDN(content.set_baseDN)
      setValue('url',content.url);
      setValue('username',content.username);
      setValue('password',content.password);
      setValue('baseDN',content.baseDN);
   }
},[content])

/** Отправка на создание/редактирование  записи - передаем пропсом в модальное окно */
const confirm_save_Entry = (data) =>{
updateEntry(data)
   .then((result) => {
      if (result?.status === "OK") {
      openGreen(result?.message)
      set_refreshContent(!refreshContent)
      } else {
      openRed(result?.message)
      }
      console.log(result)
   }).catch((err) => {console.error(err);}) 
}

   
const onSubmit = (data) =>{
   confirm_save_Entry(data)
}
return (      
       <div className="table-responsive">
          <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
             <div className="dataTable-top">
                <div className="dataTable-dropdown">               
                </div>
                <div className="dataTable-search">   
                </div>
             </div>
             <div className="dataTable-container dataTable-container-vh hooks-vh-height" style={{padding:'15px'}}>
                        <div class="modal-body">
                           <div className="row">              
                              <div className="col-sm-6">
                                    <div class="input-group input-group-dynamic is-filled my-3 ">
                                          <label class="form-label">URL сервера AD</label>
                                          <input
                                          {...register('url', {
                                          required:'Укажите URL сервера AD',
                                          maxLength: 50
                                          })}
                                       type="text" class="form-control"/>
                                    </div>
                              </div>                      
                           </div>           
                           <div className="row">              
                              <div className="col-sm-6">
                                    <div class="input-group input-group-dynamic is-filled my-3 ">
                                       <label class="form-label">Имя пользователя в формате сервера</label>
                                       <input 
                                       {...register('username', {
                                       required:'Укажите username',
                                       maxLength: 50
                                       })} 
                                       type="text" class="form-control"/>
                                    </div>
                              </div>        
                           </div>           
                           <div className="row">              
                              <div className="col-sm-6">
                                    <div class="input-group input-group-dynamic is-filled my-3 ">
                                       <label class="form-label">Пароль</label>
                                       <input 
                                       {...register('password', {
                                       required:'Укажите password',
                                       maxLength: 50
                                       })} 
                                       type="text" class="form-control"/>
                                    </div>
                              </div>        
                           </div>           
                           <div className="row">              
                              <div className="col-sm-6">
                                    <div class="input-group input-group-dynamic is-filled my-3 ">
                                       <label class="form-label">baseDN</label>
                                       <input 
                                       {...register('baseDN', {
                                       required:'Укажите baseDN',
                                       maxLength: 50
                                       })} 
                                       type="text" class="form-control"/>
                                    </div>
                              </div>        
                           </div>    
                           <div className="row">              
                              <div className="col-sm-6">
                              <button 
                                 onClick={handleSubmit(onSubmit)}
                                 type="button" class="btn bg-gradient-primary">
                                    Сохранить
                                 </button>
                              </div>        
                           </div>  
                        </div>
             </div>
             <div className="dataTable-bottom">                
             </div>
          </div>
       </div>   
    );
};

export default LdapSettings;