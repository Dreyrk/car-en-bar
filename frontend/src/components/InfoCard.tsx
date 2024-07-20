import { InfoCardProps } from "@/types/props";

export default function InfoCard({ title, icon, description }: InfoCardProps) {
  return (
    <div className="bg-primary-foreground/10 rounded-lg p-4 flex flex-col gap-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
