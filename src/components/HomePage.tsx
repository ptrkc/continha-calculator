import { PeopleSection } from "@/components/PeopleSection";
import { ItemsSection } from "@/components/ItemsSection";
import { TotalSection } from "@/components/TotalSection";
import { DollarIcon } from "./Icons";

export const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mx-auto max-w-2xl p-2">
        <h1 className="py-2 px-4 mb-2 mx-auto text-center bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white rounded-full">
          ContinhaCalculator
        </h1>
        <PeopleSection />
        <ItemsSection />
        <TotalSection />
      </div>
    </div>
  );
};
