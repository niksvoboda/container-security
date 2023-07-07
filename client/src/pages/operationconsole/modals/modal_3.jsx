import React, { useContext, useState} from 'react';
import { useForm } from "react-hook-form"
import { UserContext, TranslateContext } from '../../../contex';
import { sleep } from '../../../utils/utils';

const Modal_3 = ({exit, confirm_save_Entry}) => {
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

/** функция сравнения массива заголовков столбцов в файле с контрольным */    
const control_header_img = ['REPOSITORY','TAG','IMAGE','ID','CREATED','SIZE']  
const control_header_cont = ['CONTAINER','ID','IMAGE','COMMAND','CREATED','STATUS','PORTS','NAMES']  
function compareArrays(a, b) {
    if (a.length !== b.length) {
      return false;
    }    
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }    
    return true;
  }  

let images =[]
let containers = []

const [show_images, set_show_images] = useState(-1)
const [show_containers, set_show_containers] = useState(-1)

function readImage(file){
   const reader = new FileReader(); 
   reader.readAsText(file); 
   /** после прочтения работаем с загруженным текстом */
   reader.onload = function(event) {
   // Получаем содержимое файла и разбиваем его на массив строк
   const lines = event.target.result.split(/\r\n|\n/);
   /** удаляем проеблы с концов строки и регуляркой лишние внутри строки в первой строке  */
   const file_header = lines[0].trim().split(/\s+/)
   /** сравниваем полученный массив заголовков столбцов с контрольным */ 
   if (compareArrays(file_header, control_header_img)) {
       for (const iterator of lines.slice(1)) {
           let current = iterator.trim().split(/\s+/)
           images.push([current[0], current[1], current[2]])           
       }       
       console.log("файл образов")
   } else {
       console.log("не файл образов")
   }
}}

async function readContainer(file){
   const reader = new FileReader(); 
   reader.readAsText(file); 
   /** после прочтения работаем с загруженным текстом */
   reader.onload = async function(event) {
   // Получаем содержимое файла и разбиваем его на массив строк
   const lines = event.target.result.split(/\r\n|\n/);
   /** удаляем проеблы с концов строки и регуляркой лишние внутри строки в первой строке  */
   const file_header = lines[0].trim().split(/\s+/)
   /** сравниваем полученный массив заголовков столбцов с контрольным */ 
   if (compareArrays(file_header, control_header_cont)) {       
       for (const iterator of lines.slice(1)) {
           let current = iterator.trim().split(/\s+/)          
           containers.push([current[0], current[1], current[2]])           
       }
       console.log("файл контейнеров")
   } else {
       console.log("не файл контейнеров")
   }
}}

async function handleFileInputChange(event) {   
   set_show_images(-1)
   set_show_containers(-1)   
    /** читаем файлы как текст */
    const files = event.target.files;    
    let i = 0;
    while (i < files.length) {
      readContainer(files[i])
      readImage(files[i])      
      i++;
    }    
    await sleep(1000)
   // console.log(containers)
  //  console.log(images)
    set_show_images(images.length)
    set_show_containers(containers.length)
    setValue('images',images)
    setValue('containers',containers)
} 

const [type, set_type] = useState(0)   
return (
<>
<div className="row">
   <div className="col-sm-6">
      <div class="input-group input-group-dynamic is-filled my-3 ">
         <label class="form-label">Название задачи</label>
         <input
         {...register('title', { maxLength: 500, required: true})}
         type="email" class="form-control"/>
      </div>
   </div>
</div>
<div className="row">
   <div className="col-sm-6">
      <div class="input-group input-group-dynamic is-filled my-3 ">    
        <label class="form-label">Способ загруки</label>
        <select 
        onChange={event => set_type(event.target.value)}
        type="email" class="form-control dark-version">
            <option value={0}>Выбрать файлы</option>
            <option value={1}>Путь к директории</option>               
        </select> 
      </div>
   </div>
</div>
{type == 0 && <div className="row">
   <div className="col-sm-6">
      <div class="input-group input-group-dynamic is-filled my-3 ">
         <input 
            type="file" 
            name="files[]" 
            accept=".txt"
           // accept=".txt,.csv,.xml"
            multiple         
            onChange={event=>handleFileInputChange(event)} 
            />  
      </div>
   </div>
</div>}
{type == 1 && <div className="row">
   <div className="col-sm-6">
      <div class="input-group input-group-dynamic is-filled my-3 ">
         <label class="form-label">Указать API URL, либо IP</label>
         <input
         {...register('parse_url', { maxLength: 500})}
         type="email" class="form-control"/>
      </div>
   </div>
</div>}
{show_images > -1 && <div className="row">
   <div className="col-sm-12">
      <div class="input-group input-group-dynamic is-filled my-3 ">
         <label class="form-label"></label>Найдено образов: {show_images}
      </div>
   </div>
</div>}
{show_containers > -1 && <div className="row">
   <div className="col-sm-12">
      <div class="input-group input-group-dynamic is-filled my-3 ">
         <label class="form-label"></label>Найдено контейнеров: {show_containers}
      </div>
   </div>
</div>}
<div className="row">
   <div class="modal-footer">
      <button onClick={e=>exit()}  type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Отмена</button>
      <button 
         onClick={handleSubmit(onSubmit)}
         type="button" class="btn bg-gradient-primary">Отправить</button>
   </div>
</div>
</>
);
};

export default Modal_3;