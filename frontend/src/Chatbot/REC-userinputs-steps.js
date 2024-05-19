const rec_UserInputPrompts = [
  {
    id: "enter-your-query",
    message:"Please type your query. Please note that I am not chatGPT. I can reply to few recruitment related questions as this feature is just a POC.",
    trigger: "wait-for-rec-question",
  },
  {
    id: "wait-for-rec-question",
    user: true,
    trigger: "listening-to-input",
  },
  {
    id: "listening-to-input",
    message: ({ previousValue }) => {
      const regexSkills = /skills.*current|current.*skills|tech.*stack/i;
      const regexLocation = /(current|currently.*location|based|live)|(where.*live|located)/i;
      const regexGreetings = /\b(hello|hi|howdy|oi|morning|Good afternoon|cheerio)\b/i;
      const regexCV = /((get|send|email).*cv|resume)/i;
      const regexQuit = /((reason|why).*(leaving|quitting|job))|(change|leave).*(company|job|role)/i;
      const regexExpYears = /\byears\b.*\bexperience\b/i;
      const prevVal = previousValue.toLowerCase();
      if (regexSkills.test(prevVal)) {
        return "My main skills are JavaScript, TypeScript HTML, CSS, ReactJS, NextJS, chakra-ui, graphQL, API requests, React Testing library. and I have good experience of Microsoft Sharepoint development including RPA Automation, pure JS, CSS, HTML, MS365 eco-system.";
      } else if (regexLocation.test(prevVal)) {
        return `I am based in ${process.env.REACT_APP_LOCATION}`;
      } else if (regexGreetings.test(prevVal)) {
        return "Hello";
      } else if (prevVal.includes("current situation")) {
        return `I am currently employed at ${process.env.REACT_APP_CURR_COMPANY} as a Front-end developer.`;
      } else if (regexQuit.test(prevVal)) {
        return `${process.env.REACT_APP_REASON2LEAVE}`;
      } else if (regexCV.test(prevVal)) {
        return "sure, I will send it over. Meanwhile check my LinkedIn profile";
      } else if (regexExpYears.test(prevVal)) {
        return `I have ${process.env.REACT_APP_YEARS_EXP} years of experience as a web developer.`;
      } else {
        return "I dont understand";
      }
    },
    trigger: "any-rec-question-prompt",
  },
];
export default rec_UserInputPrompts;
