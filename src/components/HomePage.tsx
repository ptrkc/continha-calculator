import { PeopleSection } from "@/components/PeopleSection";
import { ProductsSection } from "@/components/ProductsSection";
import { TotalSection } from "@/components/TotalSection";

export const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mx-auto max-w-2xl p-2">
        <PeopleSection />
        <ProductsSection />
        <TotalSection />
      </div>
    </div>
  );
};
