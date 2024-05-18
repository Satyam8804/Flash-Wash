import React from 'react'
import Chatbot from "react-simple-chatbot";
import steps from "./MAIN-steps.js";
import chatbotImg from '../images/chat_bot.png'
const ChatBot = () => {
  const data =JSON.parse(localStorage.getItem('currentUser')) ;
  console.log()
    const stepsWithDelay = steps.map((step) => {
        if (step.hasOwnProperty("delay") || !step.hasOwnProperty("message")) {
          return step;
        } else {
          return {
            ...step,
            delay: 1000,
          };
        }
      });
  return (
    <div className="app-container">
    <div className="bot-wrapper max-w-[350px] max-h-[500px]">
      <Chatbot
        steps={stepsWithDelay}
        bubbleOptionStyle={{ backgroundColor: "white", color: "#3a3a3a" }}
        userAvatar={data?.user?.avatar}
        botAvatar={chatbotImg}
        headerTitle={`Chatbot`}
        width="100%"
      />
    </div>
  </div>
  )
}

export default ChatBot