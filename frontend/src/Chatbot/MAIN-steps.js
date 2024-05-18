import recruitmentPrompts from "./REC-steps";
import progPrompts from "./PROG-steps";
import pingPrompts from "./pingPrompts";
import rec_UserInputPrompts from "./REC-userinputs-steps";

// MAIN DIALOG FLOW
const steps = [
  {
    id: "Greet",
    message: `Hello, I am Caroline's personal assistant. I will reply to any questions you want to ask her.`,
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
      { value: "recruitment", label: "Recruitment", trigger: "recruitment" },
      {
        value: "programming buddy",
        label: "Looking for a programming buddy",
        trigger: "programmingQ1",
      },
      {
        value: "ping pong",
        label: "Want to play ping pong",
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
