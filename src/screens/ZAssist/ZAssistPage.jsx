import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "../HomeScreen/Components/Navbar";
import { useDispatch } from "react-redux";
import { setTab } from "../../redux/features/currentTab";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { mockData } from "../../assets/data";

const ZAssistPage = () => {
  const dispatch = useDispatch();
  const componentName = mockData.map((e) => e.component);

  const [aiData, setAIData] = useState(null);

  const [component, setComponent] = useState('Accelerometer')

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);


  async function run(component) {
    console.log(import.meta.env.VITE_API_KEY);
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(`I want to buy ${component}. Provide me details of vendors who sell this product including their name, contact and location in just json form in India`);
    const response = await result.response;
    const text = response.text();
    setAIData(JSON.parse(text.substring(7,text.length-3)))
  }

  useEffect(() => {
    dispatch(setTab("zassist"));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex-1  overflow-auto flex flex-col bg-white">
        <div className="flex justify-center items-center gap-5  my-4 mx-5 ">
          <Select value={component} onSelectionChange={(e) => setComponent(e.currentKey)} className="w-1/2" label="Select a component">
            {componentName.map((e) => (
              <SelectItem key={e} value={e}>
                {e}
              </SelectItem>
            ))}
          </Select>
          <Button onClick={() => run(component)} color="primary" className="h-full">Submit</Button>
        </div>
        <div className=" min-h-1 flex flex-col items-center p-5">
                {
                    aiData && aiData.map((e,i) => (<div className="w-1/3 bg-yellow-300 my-2 rounded p-5" key={i}>
                        <p>Name : {e.name}</p>
                        <p>Contact : {e.contact}</p>
                        <p>Location : {e.location}</p>
                    </div>))
                }
        </div>
      </div>
    </div>
  );
};

export default ZAssistPage;
