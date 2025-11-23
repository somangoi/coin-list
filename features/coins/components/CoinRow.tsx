import FavoriteButton from "@/features/favorites/components/FavoriteButton";
import { Coin } from "../types/coin";

interface CoinRowProps {
  coin: Coin;
}

export default function CoinRow({ coin }: CoinRowProps) {
  return (
    <>
      <td className="px-4 py-3">
        <FavoriteButton coinId={coin.id} />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={coin.image} alt={coin.name} className="w-6 h-6" />
          <div className="flex items-center gap-2">
            <span className="uppercase font-semibold">{coin.symbol}</span>
            <span className="text-gray-400 text-sm">{coin.name}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-right">${coin.current_price.toLocaleString()}</td>
      <td
        className={`px-4 py-3 text-right ${
          coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h >= 0 ? "text-green-600" : coin.price_change_percentage_24h !== null ? "text-red-600" : ""
        }`}
      >
        {coin.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%
      </td>
      <td className="px-4 py-3 text-right">${coin.total_volume.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">${coin.market_cap.toLocaleString()}</td>
    </>
  );
}
