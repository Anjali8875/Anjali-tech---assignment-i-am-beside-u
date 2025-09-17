import {assets} from "../../assets/assets"
import { useState } from "react"
import { UseMyContextApp } from "../../ContextFile/Context"

const SideBar:React.FC=()=>{

    const {inputData, setrun, setinput, setUiElemnt,setloder}=UseMyContextApp()

    const [set,setstate]=useState<boolean>(false)


type ChatText={
  id:string
  text:string
}

    const handeler=(obj:ChatText)=>{
        setrun(true)
        setinput(obj.text)
    }

    
    return(
       <>
        <div className=" hidden md:block">
            <div className="bg-gray-100 min-h-[100vh] flex flex-col justify-between p-[15px]">
         <div>
            <img onClick={()=>{setstate(!set)}} className=" w-[20px] mt-[15px] ml-[10px] cursor-pointer" src={assets.menu_icon}/>
            <div onClick={()=>setUiElemnt(false)} className=" inline-flex gap-[8px]  mt-[40px]  rounded-[50px] px-[15px] py-[10px] cursor-pointer bg-gray-200 items-center justify-center">
                <img className=" w-[20px]" src={assets.plus_icon}/>
                {set ? (<p>New Chat</p>) :null}
            </div>
           {set?( <div className="flex flex-col mt-[30px] ">
                <p>Recent</p>
                <div className="overflow-y-scroll hide-scroll-thumb h-[40vh]">
                 {inputData.map((obj)=>{
                    return(
                    <div  onClick={()=>{handeler(obj), setloder(true)}} key={obj.id} className="flex gap-[8px] pr-[40px] mt-[10px]  rounded-[50px] px-[15px] py-[10px]  items-center hover:bg-gray-200 cursor-pointer">
                    <img className=" w-[20px]" src={assets.message_icon}/>
                    <p>{obj.text.slice(0,14)}...</p>
                    </div>
                    )
                 })}
                </div>
                 
            </div>):null}
         </div>
         <div>
            <div className="flex gap-[8px] `${set?pr-[40px]:pr-[0px]}`  mt-[10px]  rounded-[50px] px-[15px] py-[10px]  items-center hover:bg-gray-200 cursor-pointer ">
                <img className=" w-[20px]" src={assets.question_icon}/>
                {set?(<p>Help</p>):null}
            </div>
             <div className="flex gap-[8px] `${set?pr-[40px]:pr-[0px]}`  mt-[10px]  rounded-[50px] px-[15px] py-[10px]  items-center hover:bg-gray-200 cursor-pointer ">
                <img className=" w-[20px]" src={assets.history_icon}/>
                {set?(<p>Activity</p>):null}
            </div>
             <div className="flex gap-[8px] `${set?pr-[40px]:pr-[0px]}`  mt-[10px]  rounded-[50px] px-[15px] py-[10px]  items-center hover:bg-gray-200 cursor-pointer ">
                <img className=" w-[20px]" src={assets.setting_icon}/>
                {set?(<p>Setting</p>):null}
            </div>
            
         </div>
        </div>
        </div>
       </>
    )
}
export default SideBar


