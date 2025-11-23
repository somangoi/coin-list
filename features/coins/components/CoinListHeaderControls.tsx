import TabNavigation from "@/features/favorites/components/TabNavigation";
import SearchBar from "@/shared/components/SearchBar";
import { useCoinListParams } from "../model/useCoinListParams";

interface CoinListHeaderControlsProps {
  params: ReturnType<typeof useCoinListParams>;
}

export default function CoinListHeaderControls({ params }: CoinListHeaderControlsProps) {
  const { activeTab, setActiveTab, searchQuery, setSearchQuery } = params;

  return (
    <div>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by name or symbol..." />
    </div>
  );
}
