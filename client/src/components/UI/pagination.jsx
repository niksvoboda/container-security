import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

export const Pagination = ({page, setPage, totalPage, onClick}) => {
    /**Считаем количество страниц при изменении и создаем массив с номерами*/    
   // const [page, setPage] = useState(1);
    const [pagesArray, setPagesArray] = useState([]);
    
    const createPagesArray = ()=>{
        let tempPagesArray = []
        for(let i=0 ; i<totalPage ; i++  ){
          tempPagesArray.push(i)
          }
        setPagesArray(tempPagesArray)
    }
   
    useEffect(()=>{
    createPagesArray()
    },[totalPage])

    const nextPage = () =>{
        if(page < pagesArray.length){
         return page + 1
        } else {
         return page
        }
    }
    const prevPage = () =>{
         if(page > 1){
          return page - 1
         } else {
          return page
         }
    }
     useEffect(()=>{
        //сбрасываем номер страницы чтобы не баговалось
         setPage(1);
     },[totalPage])
     
    return(       
        <ul className="dataTable-pagination-list">
         {page> 1 ? 
             <>
             <li className="pager"
             onClick={()=> {
                onClick(1)
                setPage(1)}}>
             <Link >
             {'‹‹'}
             </Link>
             </li>   
             <li 
             onClick={()=> {
                onClick(prevPage())
                setPage(prevPage())}}>
             <Link >
             {'‹'}
             </Link>
             </li> 
             </>
             :
             <li></li>
         }
         {pagesArray.map(p =>                      
              p> page - 6 && p < page + 4 &&
               <li 
               onClick={()=> {
                   onClick(p+1)
                   setPage(p+1)}}
               key={pagesArray.indexOf(p)} 
               className={page === p+1? 'active' : ''} > 
                   <Link >{p+1}</Link>                  
               </li>
         )}   
         {page < pagesArray.length ? 
             <>
             <li   className="pager"            
             onClick={()=> {
                onClick(nextPage())
                setPage(nextPage())}}>
             <Link  >
             {'›'}
             </Link>
             </li> 
              <li  className="pager"
             onClick={()=> {
                onClick(totalPage)
                setPage(totalPage)}}>
             <Link  >
             {'››'}
             </Link>
             </li> 
             </>
             :
             <li></li>
         }
        </ul>
   
    )
}

