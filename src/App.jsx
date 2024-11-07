import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [isCopy, setIsCopy] = useState(false);
  const [length,setLength] = useState(8);
  const [password,setPassword] = useState("");
  const clipRef = useRef();
  const [includeCaitalLetter,setIncludeCapitalLetter] = useState(false);
  const [includeNumber,setIncludeNumber] = useState(false);
  const [includeSymbol,setIncludeSymbol] = useState(false);
  const handleCopyClipBoard = async()=>{
    await navigator.clipboard.writeText(clipRef.current.innerText);
    setIsCopy(true);
  };

  useEffect(()=>{
    generatePassword();
  },[length,includeCaitalLetter,includeNumber,includeSymbol]);


  const generatePassword = () =>{
    let string = "abcdefghijklmnopqrstuvwxyz";
    if(includeNumber) string+="0987654321";
    if(includeSymbol) string+="!@#$%^&*";
    if(includeCaitalLetter) string+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for(let i=0; i<length; i++){
      let randomIndex = Math.floor(Math.random()  * string.length + 1);
      console.log(randomIndex);
      
      password += string.charAt(randomIndex)
      setPassword(password)
    }
  }

  return (
    <section className="h-screen w-full bg-slate-50 flex justify-center items-center">
      <div className="w-[400px] bg-gradient-to-r from-purple-600/80 to-purple-700/90 rounded-sm shadow-sm px-2 py-4">
      <h2 className="text-2xl font-medium text-[#f3f3f3] text-center">Password Generator</h2>
        <div className="w-full px-2 bg-white mt-4 rounded-sm shadow-sm h-10 flex justify-between items-center">
          <span
            className={`font-semibold text-md ${isCopy ? 'bg-blue-600 text-[#f3f3f3] ' : 'text-slate-600 '
            }`}
            ref={clipRef}
          >
            {password}
          </span>
          <button
            className="h-8 bg-gradient-to-r from-purple-600/80 to-purple-700/90 px-2 text-sm text-[#f3f3f3] font-medium rounded-sm shadow-sm"
            onClick={handleCopyClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="mt-4">
          <ul className="text-[#f3f3f3] font-medium">
            <li className="flex items-center gap-2"><input className="cursor-pointer w-4 h-4" type="checkbox" 
            onChange={(e)=>setIncludeNumber(e.target.checked)}
            /> <span>Include Number</span></li>
            <li className="flex items-center gap-2"><input className="cursor-pointer w-4 h-4" type="checkbox" 
            onChange={(e)=>setIncludeCapitalLetter(e.target.checked)}
            /> <span>Include Capital Letters</span></li>
            <li className="flex items-center gap-2"><input className="cursor-pointer w-4 h-4" type="checkbox" 
            onChange={(e)=>setIncludeSymbol(e.target.checked)}
            /> <span>Include Symbol</span></li>
            <li className="flex items-center gap-2"><input className="cursor-pointer" type="range" min={8} max={30}
            value={length}
            onChange={(e)=>setLength(e.target.value)}
            />  <span>Length {length}</span> </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default App;
