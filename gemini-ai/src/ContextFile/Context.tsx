import { createContext, useState, useContext,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { askServer } from "../config/gemini";


type ChatText={
  id:string
  text:string
}

type ContextApp={
  input:string
  setinput:(val:string)=>void
  onSent:()=>void
  inputData:ChatText[]
  run:boolean
  setrun:(val:boolean)=>void
  Output:string
  setOutput:(val:string)=>void
  loder:boolean
  setloder:(val:boolean)=>void
  uiElemnt:boolean
  setUiElemnt:(val:boolean)=>void
  preInput:string
  setpreInput:(val:string)=>void
}



interface ContextProviderProps {  
  
  children: React.ReactNode;
}

export const myContext=createContext<ContextApp | undefined>(undefined)

const ContextProvider:React.FC<ContextProviderProps>=({children})=>{

  const [input, setinput]=useState<string>("")
  const [inputData, setinputData]=useState<ChatText[]>([])
  const [run, setrun]=useState(false)
  const [Output, setOutput]=useState<string>("")
  const [loder, setloder]=useState(true)
  const [uiElemnt , setUiElemnt]=useState(false)
  const [preInput, setpreInput]=useState("")

  
console.log(inputData,"my")

  useEffect(() => {
  if (!run) return;

  const fetchData = async () => {
    setloder(true);
    setpreInput(input);
    await askServer(input, setOutput);
    setinput('');
    setloder(false);
  }

  fetchData();
  setrun(false);
}, [run]);



  
  const onSent=async()=>{
    setloder(true)
    setpreInput(input)
    setUiElemnt(true)
    const ChatPrompt={
       id:uuidv4(),
       text:input
     }
    setinputData([...inputData, ChatPrompt])
    await askServer(input,setOutput)
      
     setinput("")
    setloder(false)
  }

  const value={input, setinput , onSent,inputData, run, setrun,Output,setOutput,setloder,loder,uiElemnt,setUiElemnt,preInput,setpreInput}

  return(
    <myContext.Provider value={value}>{children}</myContext.Provider>
  )
}

export default ContextProvider

export const UseMyContextApp=()=>{

  const context =useContext(myContext)

  if(!context){
    throw new Error ("its mean undefine")
  }else{
    return context
  }

}