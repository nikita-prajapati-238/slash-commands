import React, { useState } from 'react';
import './App.css';

function App() {
  const commands=['upper','lower'];

  const [text,setText]=useState('');
  const [selectedIndex,setSelectedIndex]=useState(0);
  const [showPopup,setShowPopup]=useState(false);
  const [commandList,setCommandList]=useState(commands);
  const [selectedCommand,setSelectedCommand]=useState('');

  const inputChangeHandler=(event)=>{
    setText(event.target.value);
    let value=event.target.value;
    if(value && value.includes('/')){
      if(!showPopup) setShowPopup(true);
      let command=value.substring(value.indexOf('/')+1);
      setSelectedCommand(command);
      if(command){
        let filteredCommands= commands.filter(com=>{
          
          return com.includes(command);
        });
        setCommandList(filteredCommands);
      }
    }else{
      setShowPopup(false);
    }
  }

  const performCommandAction=()=>{
    switch(selectedCommand.toLowerCase()){
      case 'upper':
        setText(text.substring(0,text.indexOf('/')).toUpperCase());
        break;
        case 'lower':
          setText(text.substring(0,text.indexOf('/')).toLowerCase());
          break;
      default:
        break;
    }
  }

  const selectItem=(index)=>{
    setSelectedIndex(index);
    setSelectedCommand(commandList[index]);
    let updatedText=text;
    updatedText= updatedText.substring(0,updatedText.indexOf('/')+1).concat(commandList[index]);
    setText(updatedText);
    setShowPopup(false);
  }

  const handleKeyDown=(event)=>{
    if(event.key=='Enter'){
      console.log('enter');
      performCommandAction();
      setShowPopup(false);
    }
  }
  return (
    <div className="App">
      <label className="text-label" >Enter your text: </label>
      <textarea 
      className="app-text-area"
        value={text} 
        onChange={inputChangeHandler}
        onKeyDown={handleKeyDown}
        />
      {showPopup && 
      <div className="items">
      {commandList.map((command,index)=>{
          return (
            <button
              className={`item ${
                index === selectedIndex ? "is-selected" : ""
              }`}
              key={index}
              onClick={() => selectItem(index)}
            >
              {command}
            </button>
          );
      })}
      </div>
}
      
    </div>
  );
}

export default App;
