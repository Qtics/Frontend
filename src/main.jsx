import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsPage from "./screens/analytics/AnalyticsPage.jsx";
import InputPage from "./screens/input/InputPage.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import HomeScreen from "./screens/HomeScreen/HomeScreen.jsx";
import ChatPage from "./screens/Chat/ChatPage.jsx";
import ZAssistPage from "./screens/ZAssist/ZAssistPage.jsx";
import LoginPage from "./screens/login/LoginPage.jsx";
import SignUpPage from "./screens/signup/SignUpPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/analytics" element={<AnalyticsPage/>} />
            <Route path="/" element={<HomeScreen/>} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/zassist" element={<ZAssistPage/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
