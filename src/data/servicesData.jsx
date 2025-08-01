// src/data/servicesData.js
import {
  IoChatbubblesOutline, IoCallOutline, IoStorefrontOutline, IoDiamondOutline
} from 'react-icons/io5';
import { GiLotus, GiSun, GiChart, GiLovers } from 'react-icons/gi';

export const premiumServicesData = [
  {
    icon: <IoChatbubblesOutline/>,
    title: "Chat with Astrologer",
    link: "/chat",
  },
  {
    icon: <IoCallOutline />,
    title: "Talk to Astrologer",
    link: "/talk",
  },
  {
    icon: <IoStorefrontOutline />,
    title: "Astrology Shop",
    link: "/shop",
  },
  {
    icon: <GiLotus />,
    title: "Book a Pooja",
    link: "/pooja",
  },
];

export const complimentaryServicesData = [
  {
    icon: <GiSun />,
    title: "Today's Horoscope",
    description: "Unsure about how your day will unfold? Get your free daily horoscope prediction from our top astrologers.",
    link: "/horoscope",
  },
  {
    icon: <GiChart />,
    title: "Free Kundli",
    description: "Generate your free online Kundli report. Our software can help you predict the future for yourself by reading the birth chart.",
    link: "/kundli",
  },
  {
    icon: <GiLovers />,
    title: "Compatibility",
    description: "Confused by love? Remove the doubts & find the sparks! Check your compatibility with your partner.",
    link: "/compatibility",
  },
  {
    icon: <IoDiamondOutline />,
    title: "Kundli Matching",
    description: "Check Love Compatibility and Marriage Prediction online. Get your free Kundli matching report today!",
    link: "/matching",
  },
];