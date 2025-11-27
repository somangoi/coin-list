import { getCoinsLogic } from "@/data/coinService";
import CoinListContainer from "@/features/coins/components/CoinListContainer";

export default async function CoinListPage() {
  const initialData = getCoinsLogic({
    page: 1,
    limit: 50,
    sort: "price_desc",
  });

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency List</h1>
      <CoinListContainer initialData={initialData} />
    </div>
  );
}
