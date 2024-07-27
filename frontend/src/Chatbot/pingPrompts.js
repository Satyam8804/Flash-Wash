const pingPrompts = [
  {
    id: "PPQ1",
    message: "Great, what's your level?",
    trigger: "level-options",
  },
  {
    id: "level-options",
    options: [
      { value: "beginner", label: "Basic  Service", trigger: "beginner-lev" },
      {
        value: "garden player",
        label: "Premium",
        trigger: "garden-lev",
      },
      {
        value: "intermediate",
        label: "Dulex",
        trigger: "inter-lev",
      },
      {
        value: "advanced",
        label: "",
        trigger: "advanced-lev",
      },
    ],
    delay: 1500,
  },
  // Reject user
  {
    id: "beginner-lev",
    message:
      "Sorry! I rather playing with mid to advanced players. Train more and come back later",
    trigger: "PP-reject",
  },

  {
    id: "garden-lev",
    message: "Sorry, but I rather playing with club players",
    trigger: "PP-reject",
  },

  // return to main menu or good bye
  {
    id: "PP-reject",
    options: [
      {
        value: "main-menu",
        label: "Return to main menu",
        trigger: "contact-reasons",
      },
      { value: "No", label: "No", trigger: "goodbye" },
    ],
  },
  //  Intermediate
  {
    id: "inter-lev",
    message: "Return to main menu",
    trigger: "inter-wait-user",
  },
  {
    id: "inter-wait-user",
    user: true,
    trigger: "inter-resp-1",
  },
  {
    id: "inter-resp-1",
    message: "not bad! Where do you want to practice?",
    trigger: "inter-wait-user2",
  },
  {
    id: "inter-wait-user2",
    user: true,
    trigger: "give-contact-details",
  },
  // Advanced
  {
    id: "advanced-lev",
    message: "Great, do you play in the league?",
    trigger: "advanced-league-yes-no",
  },
  {
    id: "advanced-league-yes-no",
    options: [
      { value: "Yes", label: "Yes", trigger: "league-yes" },
      { value: "No", label: "No", trigger: "league-no" },
      {
        value: "Soon",
        label: "Soon hopefully / Training for",
        trigger: "league-soon",
      },
    ],
  },
  {
    id: "league-yes",
    message: "Wow, awesome, me too! Let's practice",
    trigger: "give-email-or-back",
  },
  {
    id: "league-no",
    message:
      "It's all right, no need to be competitive. Let's practice if you'd like",
    trigger: "give-email-or-back",
  },
  {
    id: "league-soon",
    message: "OK. Let's practice and reach our goals!",
    trigger: "give-email-or-back",
  },
  // give email to intermediate or advanced players or programmers
  {
    id: "give-contact-details",
    message: "Let's arrange something!",
    trigger: "give-email-or-back",
  },
  {
    id: "give-email-or-back",
    options: [
      {
        value: "show-email",
        label: "send me an email!",
        trigger: "show-email",
      },
      {
        value: "Back to main menu",
        label: "Back to main menu",
        trigger: "contact-reasons",
      },
    ],
  },
  {
    id: "show-email",
    message: `${process.env.REACT_APP_EMAILADDRESS} See you soon!`,
    trigger: "Back to main menu button",
  },
  {
    id: "Back to main menu button",
    options: [
      {
        value: "Back to main menu",
        label: "Back to main menu",
        trigger: "contact-reasons",
      },
    ],
  },
];

export default pingPrompts;
