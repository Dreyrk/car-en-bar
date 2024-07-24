import { LoaderCircle } from "lucide-react";

export default function Loader({ size }: { size?: number }) {
  return <LoaderCircle size={size || 30} className="animate-spin" />;
}
