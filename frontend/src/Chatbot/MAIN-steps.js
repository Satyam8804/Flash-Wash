import recruitmentPrompts from "./REC-steps";
import progPrompts from "./PROG-steps";
import pingPrompts from "./pingPrompts";
import rec_UserInputPrompts from "./REC-userinputs-steps";

// MAIN DIALOG FLOW
const steps = [
  {
    id: "Greet",
    message: `Hello, I am Flash Wash's personal assistant. I will reply to any questions you want to ask her.`,
    trigger: "Ask-name",
  },
  {
    id: "Ask-name",
    message: "What's your name, buddy?",
    trigger: "waiting-for-name",
  },
  {
    id: "waiting-for-name",
    user: true,
    trigger: "name-given",
  },
  {
    id: "name-given",
    message: `Pleasure to meet you, {previousValue}. What brings you here?`,
    trigger: "contact-reasons",
  },
  {
    id: "contact-reasons",
    options: [
      { value: "recruitment", label: "Services", trigger: "recruitment" },
      {
        value: "programming buddy",
        label: "Is there a penalty for canceling or rescheduling appointments",
        trigger: "programmingQ1",
      },
      {
        value: "ping pong",
        label: "What types of car wash services does Flash Wash offer",
        trigger: "PPQ1",
      },
    ],
  },

  // Goodbye prompt
  {
    id: "goodbye",
    message: "It was nice to chat. Good bye! 👋🏼",
    end: true,
  },

  // Recruitment
  ...recruitmentPrompts,

  // Programming buddy"
  ...progPrompts,

  // "Ping pong" ================================================
  ...pingPrompts,

  // user input open prompts
  ...rec_UserInputPrompts,
];

export default steps;
