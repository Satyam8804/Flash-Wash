// dialog flow for "programming buddy" ================================================
const progPrompts = [
  {
    id: "programmingQ1",
    message: "nice, what type of project do you want to program?",
    trigger: "programmingQ2",
  },

  {
    id: "programmingQ2",
    user: true,
    trigger: "programmingQ3",
  },
  {
    id: "programmingQ3",
    message: `Cool and what language do you use?`,
    trigger: "programmingQ4",
  },
  {
    id: "programmingQ4",
    user: true,
    trigger: "programmingQ5",
  },
  {
    id: "programmingQ5",
    message: ({ previousValue }) => {
      const sameLanguage =
        previousValue.toLowerCase().includes("javascript") ||
        previousValue.toLowerCase().includes("js");
      if (sameLanguage) {
        return "Me, too! I've coded it for years!";
      } else {
        return `{previousValue}, woahhh! let's chat.`;
      }
    },
    trigger: "give-contact-details", // this prompt is in pingPrompts
  },
];

export default progPrompts;
