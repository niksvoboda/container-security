import React, { useState ,useEffect, useContext} from 'react';
import { TranslateContext } from '../../../contex';

const Searchinput = ({setSearch}) => {
  
    const {translate} = useContext(TranslateContext)
    const[search_, setSearch_] = useState("")
    /** Задержка ввода в поле поиска */
    const delay = (userinput) =>{
        result.setup(userinput)
      // console.log('ввод')
    }

    var result  = {
        remind: function(result_input) {
             setSearch_(result_input);
        },
      
        setup: function(userinput) {
          if (typeof this.timeoutID === 'number') {
            this.cancel();
          }
      
          this.timeoutID = window.setTimeout(function(msg) {
            this.remind(userinput);
          }.bind(this), 10);
        },
      
        cancel: function() {
          window.clearTimeout(this.timeoutID);
        }
      };
    /** Если задержка истекла то отправляем запрос */
    useEffect(()=>{
      search_.length > 1 && setSearch(search_)
      search_.length == 0 && setSearch('')
     },[search_])
    return (
        <input type="search" 
        className="hook-search-input" 
        onChange={e =>delay(e.target.value)}
        placeholder= {translate('common.ui_kit.searchinput.search')}
        />
    );
};

export default Searchinput;