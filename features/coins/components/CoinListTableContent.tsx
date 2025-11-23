import { Virtualizer } from "@tanstack/react-virtual";
import FavoriteButton from "@/features/favorites/components/FavoriteButton";
import { Coin } from "../types/coin";
import { useCoinListParams } from "../model/useCoinListParams";
import { SortKey } from "../types/sort";

interface CoinListTableContentProps {
  filteredCoins: Coin[];
  hasNextPage: boolean | undefined;
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  params: ReturnType<typeof useCoinListParams>;
}

export default function CoinListTableContent({ filteredCoins, hasNextPage, tableContainerRef, rowVirtualizer, params }: CoinListTableContentProps) {
  const { sortKey, sortDirection, handleSort } = params;

  const SortableHeader = ({ sortKeyValue, children, align = "right" }: { sortKeyValue: SortKey; children: React.ReactNode; align?: "left" | "right" }) => (
    <th className={`px-4 py-3 text-${align} font-semibold cursor-pointer hover:bg-gray-100 select-none`} onClick={() => handleSort(sortKeyValue)}>
      <div className={`flex items-center gap-1 ${align === "right" ? "justify-end" : "justify-start"}`}>
        {children}
        {sortKey === sortKeyValue && <span className="text-xs">{sortDirection === "asc" ? "▲" : "▼"}</span>}
      </div>
    </th>
  );

  return (
    <div ref={tableContainerRef} className="overflow-auto h-[600px]">
      <table className="w-full border-collapse table-fixed">
        <colgroup>
          <col style={{ width: "40px" }} />
          <col style={{ width: "300px" }} />
          <col style={{ width: "130px" }} />
          <col style={{ width: "130px" }} />
          <col style={{ width: "150px" }} />
          <col style={{ width: "150px" }} />
        </colgroup>
        <thead className="sticky top-0 bg-white z-10">
          <tr className="border-b">
            <th className="px-4 py-3 text-left font-semibold"></th>
            <th className="px-4 py-3 text-left font-semibold">Coin</th>
            <SortableHeader sortKeyValue="price">Price</SortableHeader>
            <SortableHeader sortKeyValue="change">24h Change</SortableHeader>
            <SortableHeader sortKeyValue="volume">24h Volume</SortableHeader>
            <SortableHeader sortKeyValue="marketCap">Market Cap</SortableHeader>
          </tr>
        </thead>
        <tbody style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative" }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > filteredCoins.length - 1;
              const coin = filteredCoins[virtualRow.index];

              return (
                <tr
                  key={virtualRow.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="border-b hover:bg-gray-50"
                >
                  {isLoaderRow ? (
                    <td colSpan={6} className="px-4 py-3 text-center">
                      {hasNextPage ? "Loading more..." : "No more data"}
                    </td>
                  ) : coin ? (
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
                  ) : null}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
