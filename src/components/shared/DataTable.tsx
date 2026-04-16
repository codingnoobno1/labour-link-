import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  MoreVertical,
  Loader2
} from 'lucide-react';

interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (term: string) => void;
  actions?: (item: T) => React.ReactNode;
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  title,
  searchPlaceholder = "Search...",
  onSearch,
  actions
}: DataTableProps<T>) => {
  return (
    <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Table Header Action Bar */}
      {(title || onSearch) && (
        <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {title && <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>}
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onSearch && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            )}
            <button className="p-2 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/50 text-zinc-500 uppercase text-[10px] font-bold tracking-widest border-b border-zinc-800">
              {columns.map((col, idx) => (
                <th key={idx} className={cn("px-6 py-4", col.className)}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-sm text-zinc-500">Loading data...</p>
                  </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                  {columns.map((col, idx) => (
                    <td key={idx} className={cn("px-6 py-5 text-sm text-zinc-300", col.className)}>
                      {col.cell ? col.cell(item) : (item[col.accessorKey as keyof T] as React.ReactNode)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-5 text-right">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-20 text-center text-zinc-500">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-2">
                      <Search className="w-6 h-6 text-zinc-600" />
                    </div>
                    <p className="text-lg font-medium text-zinc-400">No results found</p>
                    <p className="text-sm">Try adjusting your filters or search terms.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && data.length > 0 && (
        <div className="p-4 border-t border-zinc-800 flex items-center justify-between bg-zinc-950/30">
          <p className="text-xs text-zinc-500">
            Showing <span className="text-zinc-300 font-medium">{data.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-bold">1</button>
            </div>
            <button className="p-2 border border-zinc-800 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all disabled:opacity-50" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
