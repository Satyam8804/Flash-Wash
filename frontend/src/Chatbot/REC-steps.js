// dialog flow for "recruitment" ================================================
const recruitmentPrompts = [
  {
    id: "recruitment",
    message: `I can't wait to hear what you have to offer! Please select any topic and I will answer on behalf of Caroline`,
    trigger: "rec-options",
  },
  {
    id: "any-questions-rec",
    message: "Any questions?",
    trigger: "any-questions-yesno-answer",
  },
  {
    id: "any-questions-yesno-answer",
    options: [
      {
        value: "yes",
        label: "yes, type my question",
        trigger: "wait-for-rec-question",
      },
      {
        value: "Back to rec menu",
        label: "Yes, send me back to rec menu",
        trigger: "rec-options",
      },
      {
        value: "Back to main menu",
        label: "yes, back to main menu",
        trigger: "contact-reasons",
      },

      {
        value: "no",
        label: "no",
        trigger: "goodbye",
      },
    ],
  },

  // recruiter topic options -----------
  {
    id: "rec-options",
    options: [
      {
        value: "salary expectation",
        label: "Salary expectation",
        trigger: "salary-expectation",
      },
      {
        value: "notice period",
        label: "Notice period",
        trigger: "notice-period",
      },
      {
        value: "work style",
        label: "Work style",
        trigger: "work-style",
      },
      {
        value: "right to work in UK",
        label: "Right to work in UK",
        trigger: "rights-work",
      },
      {
        value: "current location",
        label: "Current location",
        trigger: "curr-location",
      },
      {
        value: "preferred work style",
        label: "Preferred work style",
        trigger: "preferred-workstyle",
      },
      {
        value: "contact",
        label: "Contact details",
        trigger: "contact-details",
      },
      {
        value: "Show other topics",
        label: "Show me other topics",
        trigger: "rec-options2",
      },
      {
        value: "other",
        label: "Free rec question",
        trigger: "enter-your-query", // this prompt is located in "REC-userinputs-steps.js"
      },
      {
        value: "back to main menu from rec-options",
        label: "Back to main menu",
        trigger: "contact-reasons",
      },
    ],
  },

  {
    id: "rec-options2",
    options: [
      {
        value: "Relocation",
        label: "Relocation",
        trigger: "relocation",
      },
      {
        value: "Favorite Tech",
        label: "Favorite Tech",
        trigger: "fav-tech",
      },
      {
        value: "Career interest",
        label: "Career/Tech interests",
        trigger: "tech-interests",
      },
      {
        value: "tech stack",
        label: "What is your Tech stack",
        trigger: "tech-stack",
      },
      {
        value: "portfolio",
        label: "Portfolio",
        trigger: "portfolio",
      },
      {
        value: "side projects",
        label: "Side projects links",
        trigger: "side-projects",
      },
      {
        value: "Back to rec menu",
        label: "Back to Rec menu",
        trigger: "rec-options",
      },
    ],
  },
  // chatbot asks if you have any other question
  {
    id: "any-rec-question-prompt",
    message: "Any other rec question?",
    trigger: "any-questions-yesno-answer",
  },
  {
    id: "back-to-prev-rec-menu",
    options: [
      {
        value: "back to previous rec topics",
        label: "Back to previous topics",
        trigger: "rec-options2",
      },
      {
        value: "back to rec menu from topics 2",
        label: "Back to Rec menu",
        trigger: "rec-options",
      },
    ],
  },
  // Answers to tag topics
  {
    id: "salary-expectation",
    message: `${process.env.REACT_APP_SALARY}.`,
    trigger: "any-rec-question-prompt",
  },
  {
    id: "notice-period",
    message: `notice period : ${process.env.REACT_APP_NOTICEPERIOD}.`,
    trigger: "any-rec-question-prompt",
  },
  {
    id: "work-style",
    message:
      "I am open to Hybrid up to 2 days at the office / week maximum, or fully remote.",
    trigger: "any-rec-question-prompt",
  },

  {
    id: "rights-work",
    message: `Don't worry! I have the settled status. I have unlimited right to work in the UK.`,
    trigger: "any-rec-question-prompt",
  },
  {
    id: "curr-location",
    message: `I am currently living in ${process.env.REACT_APP_LOCATION}`,
    trigger: "any-rec-question-prompt",
  },
  {
    id: "preferred-workstyle",
    message: `${process.env.REACT_APP_WORKSTYLE}`,
    trigger: "any-rec-question-prompt",
  },
  {
    id: "contact-details",
    message: `Connect with me LinkedIn: ${process.env.REACT_APP_LINKEDIN},
    or send me an email: ${process.env.REACT_APP_EMAILADDRESS}`,
    trigger: "any-rec-question-prompt",
  },
  {
    id: "relocation",
    message: `${process.env.REACT_APP_RELOCATION}`,
    trigger: "back-to-prev-rec-menu",
  },
  {
    id: "fav-tech",
    message: `I am open to ${process.env.REACT_APP_FAV_TECH}`,
    trigger: "back-to-prev-rec-menu",
  },
  {
    id: "tech-interests",
    message: `I am in interested in ${process.env.REACT_APP_TECH_INTEREST}`,
    trigger: "back-to-prev-rec-menu",
  },

  {
    id: "portfolio",
    message: `My portfolio is under construction, although my side-projects are available on github: ${process.env.REACT_APP_GITHUB_URL}. `,
    trigger: "back-to-prev-rec-menu",
  },
  {
    id: "side-projects",
    message: `${process.env.REACT_APP_SIDE_PROJECTS}`,
    trigger: "back-to-prev-rec-menu",
  },
  {
    id: "tech-stack",
    message: `${process.env.REACT_APP_TECH_STACK}`,
    trigger: "back-to-prev-rec-menu",
  },
];

export default recruitmentPrompts;
