import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import { alert_system, law_data, opportunity_data, therapy_data, zChat } from "./data";
import { useDispatch } from "react-redux";
import { setTab } from "../../redux/features/currentTab";
import Footer from "./Components/Footer";

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setTab("home"))
    console.log(import.meta.env.VITE_API_URL)
  },[])
  return (
    <div className="flex flex-col min-h-screen w-full bg-yellow-200">
      <Navbar />
      <div className="w-full flex flex-col items-center mt-16 px-10">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ztics
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your customizable data analytics tool 
          </p>
          <div className="flex justify-center mt-10">
            <button className="bg-yellow-500 p-2 rounded text-black">Explore More</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-10 py-10 px-10 md:px-24 gap-10">
        <Card imgUrl={therapy_data.imageUrl} description={therapy_data.description} title={therapy_data.title} redirectUrl={therapy_data.redirectUrl}/>
        <Card imgUrl={opportunity_data.imageUrl} description={opportunity_data.description} title={opportunity_data.title} redirectUrl={opportunity_data.redirectUrl}/>
        <Card imgUrl={law_data.imageUrl} description={law_data.description} title={law_data.title} redirectUrl={law_data.redirectUrl}/>
        <Card imgUrl={alert_system.imageUrl} description={alert_system.description} title={alert_system.title} redirectUrl={alert_system.redirectUrl}/>
        <Card imgUrl={zChat.imageUrl} description={zChat.description} title={zChat.title} redirectUrl={zChat.redirectUrl}/>
      </div>
      <Footer/>
    </div>
  );
};

export default HomeScreen;
