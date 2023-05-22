import React, { useState ,useEffect, useContext} from 'react';
import { fetchEntrys  , fetchEntry , addEntry, updateEntry, deleteEntry} from "../../../http/api_users";
import Pagenumbers from '../../../components/UI/pagenumbers';
import { Pagination } from '../../../components/UI/pagination';
import { Select } from "../../../components/UI/select";
import date_format  from "dateformat";
import Searchinput from '../../../components/UI/searchinput';
import { Modal } from './modal';
import { ModalDelete } from './modal_delete';
import { useSnackbar } from 'react-simple-snackbar'
import { option_green_snackbar, option_red_snackbar } from '../../../components/UI/Snackbar';
import { UserContext } from '../../../contex';

const Users = () => {
/** Ролевая модель */
const {user} = useContext(UserContext)
/** Всплывающее сообщение */
const [openGreen, closeGreen] = useSnackbar(option_green_snackbar)
const [openRed, closeRed] = useSnackbar(option_red_snackbar)

const mask = "yyyy.mm.dd HH:MM:ss";
const [content, setContent] = useState([{}]);
/** Для компонента поиска */
const[search, setSearch] = useState("")
//Количество записей на странице
const [length, setLength] = useState(2);
const [start, setStart] = useState(0);
//Пагинация
const [totalPage, setTotalPage] = useState(0);
const [totalCount, setTotalCount] = useState(0);
const [page, setPage] = useState(1);

/** Обновляем содержимое при изменении параметров выборки */ 
const [refreshContent, set_refreshContent] = useState(false)

//Получение контента и общего количества записей из бд
useEffect(()=>{
   fetchEntrys(start, length, search)
   .then((content) => {
      console.log(content)
      setContent(content?.data)
      setTotalCount(content?.total_entrys)      
   })
    .catch((err) => {
      console.error(err);
   })
},[length, start, search, refreshContent])

//Отслеживаем количество страниц
useEffect(()=>{
    setTotalPage(Math.floor(totalCount/length + 0.999)  )
},[totalCount , length])
//Отслеживаем начальную запись выборки для вывода на страницу
useEffect(()=>{
    if (totalCount > length ) {
        setStart((page - 1) * length)
        //console.log(page)  
    } else {
        setStart(0)
    }
},[page, length])

useEffect(()=>{
   //сбрасываем номер страницы чтобы не баговалось при переключении количества записей на странице
    setPage(1);
},[length])

   /** Обслуживаем модальные окна */
   
   const [hideModal, set_hideModal] = useState(false)
   const [entry_id, set_entry_id] = useState(null)
   const [hideDeleteModal, set_hideDeleteModal] = useState(false)
   const [entry, set_entry] = useState(null)
   /** Открываем окно с пустой записью */
   const open_create_Entry = () =>{      
      fetchEntry(0)
      .then((content) => {
         console.log(content)
         set_entry(content);
         set_hideModal(true);
      })
       .catch((err) => {
         console.error(err);
      })  
   }
   /** Открываем модальное окно с данными записи, при клике на кнопку подгружаем запись по ID чтобы потом передать ее пропсом*/
   const open_update_Entry = (entry_id) =>{
      fetchEntry(entry_id)
      .then((content) => {
         console.log(content)
         set_entry(content);
         set_hideModal(true);
         set_entry_id(entry_id);
      })
       .catch((err) => {
         console.error(err);
      })  
   }
 
   /** Отправка на создание/редактирование  записи - передаем пропсом в модальное окно */
   const  confirm_save_Entry = (data, entry_id) =>{
      if (entry_id) {
         updateEntry(data, entry_id)
         .then((result) => {
           if (result?.status === "OK") {
            openGreen(result?.message)
             /** Если запрос успешен закрываем форму и обнуляем ENTRY_ID */
             exit()
             } else {
            openRed(result?.message)
             }
            console.log(result)
          })
          .catch((err) => {console.error(err);}) 
      } else{
         addEntry (data)
         .then((result) => {
           if (result?.status === "OK") {
            openGreen(result?.message)
             /** Если запрос успешен закрываем форму и обнуляем ENTRY_ID */
             exit()
             } else {
            openRed(result?.message)
             }
            console.log(result)
          })
          .catch((err) => {console.error(err);}) 
      }
   }
   /** Открываем окно с запросом на подверждение удаления
    * вызываем по клику на кнопку удалить назначаем entry_id 
    * чтобы он пропсом передался в модальное окно вместе с функцией удаления*/
   const open_delete_Entry = (entry_id) =>{
      set_entry_id(entry_id);
      set_hideDeleteModal(true);
   }
   /** Подверждение удаления - функцию передаем пропсом в модальное окно подверждения*/
   const  confirm_delete_Entry = (entry_id) =>{
      deleteEntry(entry_id)
      .then((result) => {
         if (result?.status === "OK") {
            openGreen(result?.message)
             /** Если запрос успешен закрываем форму и обнуляем ENTRY_ID */
             set_hideModal(false);
             set_entry_id(null);
             exit()
             } else {
            openRed(result?.message)
             }
         /**Если успешно скрываем окно и обнуляем ID*/
  
      })
       .catch((err) => {
         console.error(err);
      }) 
   }
   /** Передаем пропсами для закрытия модального окна */
   const exit = () =>{
      /**Притормаживаем чтобы usEffect для обновления контента сработал после удаления записи из БД и показал актуальную страницу */
      setTimeout(()=>{
         set_refreshContent(!refreshContent)
      }, 300)
      /**Закрываем окна и очищаем данные*/
      set_hideModal(false);
      set_hideDeleteModal(false);
      set_entry(null);
      set_entry_id(null);
   }

   /** Открываем модальное окно с данными записи, при клике на кнопку подгружаем запись по ID чтобы потом передать ее пропсом*/

return (<>
    {hideDeleteModal?
    <ModalDelete
     entry_id= {entry_id}
     confirm_delete_Entry={confirm_delete_Entry}
     exit = {exit}
     /> : ''
     }
   {hideModal? 
      <Modal 
      entry={entry} 
      confirm_save_Entry={confirm_save_Entry} 
      exit = {exit}
   />: "" }   

<div className="row">
 <div className="col-12">
    <div className="card">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-1">
                <h6 className="text-white text-capitalize ps-3">Пользователи</h6>
              </div>
            </div>            
       <div className="table-responsive">
          <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
             <div className="dataTable-top">
                <div className="dataTable-dropdown">
                   <label>
                   <Select                     
                      options={[
                     // 
                      {type: 1, name: '1'},
                      {type: 2, name: '2'},
                      {type: 10, name: '10'},
                      {type: 25, name: '25'},
                      {type: 50, name: '50'},
                      {type: 100, name: '100'}
                      ]}
                       onChange={selectedSort =>setLength(selectedSort)}
                       defaultValue={length}
                      />                         
                    </label>&nbsp;
                   <Searchinput
                   setSearch={setSearch}
                   />
                </div>
                <div className="dataTable-search">   
                <button 
                onClick={e=>open_create_Entry()}
                type="button" className="btn bg-gradient-info btn-block" data-bs-toggle="modal" data-bs-target="#exampleModalSignUp">
                   Добавить пользователя
                </button>
                </div>
             </div>
             <div className="dataTable-container dataTable-container-vh hooks-vh-height">
                <table className="table table-flush dataTable-table" id="datatable-search">
                   <thead className="thead-light">
                   <tr>
                     <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="20px" >ID
                        </th>                
                     <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >ФИО
                        </th>                 
                     <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Логин
                        </th>
                     <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >E-mail
                        </th>
                     <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" >Создан
                        </th>                 
                     <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="40px">
                        <i class="material-icons">edit</i>
                        </th>                   
                     <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="40px">
                        <i class="material-icons">delete</i>
                        </th>
                  </tr>
                   </thead>
                   <tbody>
                   {content?.map(entry=><tr key={entry.username}>
                        <td class="text-sm font-weight-normal">{entry.user_id}</td>
                        <td class="text-sm font-weight-normal">{entry.username}</td>
                        <td class="text-sm font-weight-normal">{entry.login}</td>
                        <td class="text-sm font-weight-normal">{entry.email}</td>
                        <td class="text-sm font-weight-normal">{date_format(entry.created_dt, mask)}</td>                      
                        <td class="text-sm font-weight-normal">
                           <i class="material-icons cursor-pointer" title="Редактировать пользователя" onClick={event=> open_update_Entry(entry.user_id)} >edit</i>
                           </td>                       
                        <td class="text-sm font-weight-normal">
                           <i class="material-icons cursor-pointer" title="Удалить пользователя" onClick={event=> open_delete_Entry(entry.user_id)}>delete</i>
                           </td>
                      </tr>)}
                   </tbody>
                </table>
             </div>
             <div className="dataTable-bottom">
                <div className="dataTable-info">
                  <Pagenumbers
                   start={start}
                   length ={length}
                   totalCount={totalCount}
                   />
                </div>
                <nav className="dataTable-pagination">
                <Pagination
              page={page}
              setPage={setPage}
              totalPage={totalPage}
              onClick={selectedPage =>setPage(selectedPage)}
              />
                </nav>
              </div>
          </div>
       </div>
    </div>
 </div>
</div>

    </>
    );
};

export default Users;