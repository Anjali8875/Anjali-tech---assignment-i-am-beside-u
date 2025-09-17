import { assets } from "../../assets/assets";
import { UseMyContextApp } from "../../ContextFile/Context";
import cartData from "../cart";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";


const Main = () => {
  const [Displayed, setDisplayed] = useState<string>("hellow");
  const safeText = Displayed || "";
  const { setinput,  input, Output, loder, uiElemnt, preInput, setrun, setUiElemnt, setOutput } =UseMyContextApp();
  
  const FinalOutput = Output;

  const [pdfFile, setPdfFile] = useState<string | null>(null);

  type data = {
    id: number;
    textFeild: string;
  };

  useEffect(() => {
    let i = 0;
    if (!safeText) return;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + FinalOutput[i]);
      i++;
      if (i >= FinalOutput.length) clearInterval(interval);
    }, 20); 

    return () => clearInterval(interval);
  }, [FinalOutput]);

  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = () => {
        setPdfFile(reader.result as string);
      };
    }
  };

 
  const handleSend = async () => {
    if (!input && !pdfFile) return;
    try {
      setUiElemnt(true);
      setrun(true);
      setOutput("");

      const response = await fetch("http://localhost:5000/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          file: pdfFile,
        }),
      });

      const data = await response.json();
      setOutput(data.answer);
    } catch (err) {
      console.error(err);
    }
  };

  const handel = async (obj: data) => {
    setUiElemnt(true);
    setrun(true);
    setinput(obj.textFeild);
  };

  return (
    <>
      <div className="min-h-[100vh] flex-1">
        <div className="flex items-center justify-between p-[15px] md:p-[20px]">
          <p className="text-[22px] text-gray-600 font-bold ">Anjali Tech</p>
          <img className="w-[80px] md:w-[130px] rounded-[50px]" src={assets.User_Image} />
        </div>

        <div className="max-w-[990px] m-auto relative h-[83vh] md:h-[75vh]">
          {!uiElemnt ? (
            <>
              <div className="text-[25px] md:text-[50px] text-slate-400 font-medium my-[10px] md:my-[50px] px-[15px] md:px-[20px]">
                <p>
                  <span className="bg-gradient-to-r from-transparent via-blue-600 to-red-400 bg-clip-text text-transparent">
                    Hello, User.
                  </span>
                </p>
                <p className="text-red-300">How Can i help you today ? </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 p-[15px] md:p-[20px] gap-2 md:gap-[20px]">
                {cartData.map((obj) => {
                  return (
                    <div
                      key={obj.id}
                      onClick={() => {
                        handel(obj);
                      }}
                      className="bg-gray-100 hover:bg-gray-200 cursor-pointer p-[20px] h-[190px] md:h-[200px] relative"
                    >
                      <p className="text-[17px]">{obj.textFeild}</p>
                      <img
                        className="w-[35px] bg-white rounded-2xl absolute bottom-2.5 right-2.5"
                        src={assets.compass_icon}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="h-[89%] overflow-auto scrollbar-none">
              <div className="flex gap-3.5 md:px-[0px] px-[15px] items-center">
                <img
                  className="w-[40px] md:w-[30px] rounded-[50px]"
                  src={assets.User_Image}
                />
                <div className="text-[15px] md:text-[20px] mr-4">{preInput}</div>
              </div>
              <img
                className="w-[50px] md:ml-[0px] ml-[15px]"
                src={assets.gemini_icon}
              />
              {loder ? (
                <div className="w-[100%] flex flex-col gap-3 h-[63vh] md:h-[60vh] animate-pulse p-[20px] px-[20px]">
                  <hr className="rounded-2xl h-[20px] bg-blue-100 border-0 bg-gradient-to-r via-blue-50 from-blue-100 to-blue-200 " />
                  <hr className="rounded-2xl h-[20px] bg-blue-100 border-0 bg-gradient-to-r via-blue-100 from-blue-200 to-blue-300" />
                  <hr className="rounded-2xl h-[20px] bg-blue-100 border-0 bg-gradient-to-r via-blue-100 from-blue-200 to-blue-300" />
                </div>
              ) : (
                <div className="ai-output px-[10px]">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {Displayed}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          )}

      
          <div className="w-[100%] max-w-900px px-[10px] md:px-[20px] m-auto absolute mt-[10px] md:mt-[20px] bottom-[0px] ">
            <div className="px-[10px] md:px-[20px] py-[10px] bg-gray-100 rounded-3xl flex justify-between gap-2 md:gap-5">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setinput(e.target.value);
                }}
                className="flex-1 text-[17px] outline-0"
                type="text"
                placeholder="Enter a prompt"
                value={input}
              />

              <div className="flex md:gap-2 items-center">
               
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  id="pdf-upload"
                  onChange={handleFileUpload}
                />
                <label htmlFor="pdf-upload">
                  <img
                    className="w-[30px] cursor-pointer"
                    src={assets.gallery_icon}
                  />
                </label>

                <img className="w-[30px]" src={assets.mic_icon} />

                {(input || pdfFile) && (
                  <img
                    onClick={handleSend}
                    className="w-[30px] cursor-pointer"
                    src={assets.send_icon}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
