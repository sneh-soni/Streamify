import { Check } from "lucide-react";

export const VerifiedMark = () => {
  return (
    <div className="flex items-center justify-center h-4 w-4 rounded-full bg-blue-600 p-1">
      <Check className="text-primary stroke-[4px]" />
    </div>
  );
};
