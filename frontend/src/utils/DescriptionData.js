import cardImg1 from "../images/1.jpg";
import cardImg2 from "../images/2.jpg";
import cardImg3 from "../images/3.jpg";

export const Description_Data = [
  {
    title: "Book Your Slot",
    text: "Book online. We will come to your doorstep and provide you with a trusted and excellent service.",
    btnText: "Book Now",
    url: cardImg1,
    route :"/service"
  },
  {
    title: "5-Star Rated Service",
    text: "Every cleaner is trusted and reliable. They have been background-checked & trained well",
    btnText: "Know More",
    url: cardImg2,
    route :"/about"
  },
  {
    title: "Pay And Rate Us",
    text: "Pay, just once you are satisfied with the shine, and don’t forget to rate our services!",
    btnText: "Rate Us",
    url: cardImg3,
    route :"/api/v1/users/profile/feedback"
  },
];
