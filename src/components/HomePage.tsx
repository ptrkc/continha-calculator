import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ItemsSection } from '@/components/ItemsSection';
import { PeopleSection } from '@/components/PeopleSection';
import { TotalSection } from '@/components/TotalSection';

export function HomePage() {
  return (
    <div className="flex flex-col gap-6  mx-auto max-w-2xl p-2">
      <Header />
      <PeopleSection />
      <ItemsSection />
      <TotalSection />
      <Footer />
    </div>
  );
}
