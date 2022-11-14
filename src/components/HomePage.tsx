import { PeopleSection } from "@/components/PeopleSection";
import { ItemsSection } from "@/components/ItemsSection";
import { TotalSection } from "@/components/TotalSection";

export const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mx-auto max-w-2xl p-2">
        <PeopleSection />
        <ItemsSection />
        <TotalSection />
      </div>
    </div>
  );
};
