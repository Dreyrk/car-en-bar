import { HandCoins, ShieldCheck } from "lucide-react";
import InfoCard from "../InfoCard";

const infoCards = [
  {
    title: "Low prices trips",
    icon: <HandCoins color="#9ab3b8" />,
    description:
      "No matter where you&apos;re going, find the perfect trip from our wide selection of affordable destinations.",
  },
  {
    title: "Confidence Travel",
    icon: <ShieldCheck color="#9ab3b8" />,
    description:
      "We take the time to get to know our members and our partner bus companies. We verify reviews, profiles, and IDs. So, you know who you're traveling with and can book with confidence on our secure platform.",
  },
  {
    title: "Search, Click and Book",
    icon: <HandCoins color="#9ab3b8" />,
    description:
      "Booking a trip has never been easier! Our user-friendly app, equipped with advanced technologies, allows you to book a nearby trip in no time.",
  },
];

export default function Infos() {
  return (
    <section className="flex flex-col gap-8 mb-10">
      {infoCards.map(({ title, icon, description }) => (
        <InfoCard key={title} title={title} icon={icon} description={description} />
      ))}
    </section>
  );
}
