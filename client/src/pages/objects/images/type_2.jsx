import React, {useState} from 'react';


const Type_2 = ({setValue}) => {
   
 /** функция сравнения массива заголовков столбцов в файле с контрольным */    
const control_header = ['REPOSITORY', 'TAG', 'IMAGE', 'ID', 'CREATED', 'SIZE']  
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

const [fileContent, setFileContent] = useState('');

function handleFileInputChange(event) {   
    /** читаем файл как текст */
    const file = event.target.files[0];
    const reader = new FileReader(); 
    let images = [];

    reader.readAsText(file); 

    /** после прочтения работаем с загруженным текстом */
    reader.onload = function(event) {
    // Получаем содержимое файла и разбиваем его на массив строк
    const lines = event.target.result.split(/\r\n|\n/);
    /** удаляем проеблы с концов строки и регуляркой лишние внутри строки в первой строке  */
    const file_header = lines[0].trim().split(/\s+/)
    /** сравниваем полученный массив заголовков столбцов с контрольным */ 
    if (compareArrays(file_header, control_header)) {
        console.log("файл образов")
        for (const iterator of lines.slice(1)) {
            let current = iterator.trim().split(/\s+/)
            images.push([current[0], current[1], current[2]])
           setValue('images', images)
        }
        console.log(images)
    } else {
        console.log("не файл образов")
    }

    // Объединяем строки в параграф с переносами строк между ними
    const content = lines.map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>);
    setFileContent(content);    
          //  console.log(content)
        };  
    
    
    }   
return (
      <div className="App">
        <header className="App-header">
          <div>
            <input 
            type="file" 
            name="files[]" 
            accept=".txt,.csv,.xml"
            multiple         
            onChange={handleFileInputChange} 
            />
            <p>{fileContent}</p>
          </div>
        </header>
      </div>
    );
};

export default Type_2;