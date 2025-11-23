import { InfiniteData } from "@tanstack/react-query";
import { GetCoinsResponse } from "../api/getCoins";

interface CoinListFooterMetaProps {
  data: InfiniteData<GetCoinsResponse> | undefined;
  filteredCoinsLength: number;
  isFetchingNextPage: boolean;
}

export default function CoinListFooterMeta({ data, filteredCoinsLength, isFetchingNextPage }: CoinListFooterMetaProps) {
  return (
    <div className="mt-4 text-center text-sm text-gray-600">
      {data && (
        <p>
          전체 {data.pages[0]?.meta.total.toLocaleString() || 0}개의 코인 중 {filteredCoinsLength.toLocaleString()}개를 표시
          {isFetchingNextPage && " (불러오는 중...)"}
        </p>
      )}
    </div>
  );
}
