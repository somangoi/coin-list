import { SortKey, SortDirection } from "../types/sort";

interface SortableHeaderProps {
  sortKeyValue: SortKey;
  children: React.ReactNode;
  align?: "left" | "right";
  sortKey: SortKey | null;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

export default function SortableHeader({ sortKeyValue, children, align = "right", sortKey, sortDirection, onSort }: SortableHeaderProps) {
  return (
    <th className={`px-4 py-3 text-${align} font-semibold cursor-pointer hover:bg-gray-100 select-none`} onClick={() => onSort(sortKeyValue)}>
      <div className={`flex items-center gap-1 ${align === "right" ? "justify-end" : "justify-start"}`}>
        {children}
        {sortKey === sortKeyValue && <span className="text-xs">{sortDirection === "asc" ? "▲" : "▼"}</span>}
      </div>
    </th>
  );
}
