import mockCoins from "@/data/mock_coins.json";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  total_volume: number;
  market_cap: number;
  image: string;
  [key: string]: any;
}

export interface GetCoinsParams {
  query?: string;
  sort?: string;
  page?: number;
  limit?: number;
  ids?: string;
}

export function getCoinsLogic(params: GetCoinsParams = {}) {
  const { query = "", sort = "", page = 1, limit = 50, ids = "" } = params;

  let filteredCoins: Coin[] = [...mockCoins];

  // 즐겨찾기 필터링
  if (ids) {
    if (ids === "__EMPTY__") {
      filteredCoins = [];
    } else {
      const favoriteIds = ids.split(",").filter(Boolean);
      filteredCoins = filteredCoins.filter((coin) => favoriteIds.includes(coin.id));
    }
  }

  // 검색 필터링
  if (query) {
    filteredCoins = filteredCoins.filter((coin) => coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase()));
  }

  // 정렬
  if (sort) {
    const [sortKey, sortDirection] = sort.split("_");

    filteredCoins.sort((a, b) => {
      const getValue = (coin: Coin) => {
        switch (sortKey) {
          case "price":
            return coin.current_price;
          case "change":
            return coin.price_change_percentage_24h ?? 0;
          case "volume":
            return coin.total_volume;
          case "marketCap":
          case "market_cap":
            return coin.market_cap;
          default:
            return coin.market_cap;
        }
      };

      const aValue = getValue(a);
      const bValue = getValue(b);
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    });
  }

  // 페이지네이션
  const total = filteredCoins.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedCoins = filteredCoins.slice(start, end);

  return {
    data: paginatedCoins,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}
