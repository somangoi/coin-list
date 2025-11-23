import { Virtualizer } from "@tanstack/react-virtual";
import { Coin } from "../types/coin";
import { useCoinListParams } from "../model/useCoinListParams";
import SortableHeader from "./SortableHeader";
import CoinRow from "./CoinRow";

interface CoinListTableContentProps {
  filteredCoins: Coin[];
  hasNextPage: boolean | undefined;
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  params: ReturnType<typeof useCoinListParams>;
}

export default function CoinListTableContent({ filteredCoins, hasNextPage, tableContainerRef, rowVirtualizer, params }: CoinListTableContentProps) {
  const { sortKey, sortDirection, handleSort } = params;

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
            <SortableHeader sortKeyValue="price" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>
              Price
            </SortableHeader>
            <SortableHeader sortKeyValue="change" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>
              24h Change
            </SortableHeader>
            <SortableHeader sortKeyValue="volume" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>
              24h Volume
            </SortableHeader>
            <SortableHeader sortKeyValue="marketCap" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>
              Market Cap
            </SortableHeader>
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
                    <CoinRow coin={coin} />
                  ) : null}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
