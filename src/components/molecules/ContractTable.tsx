import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/table';
import { cn } from '@/utils/styles';
import { StatusBadge, type PaymentStatus } from './StatusBadge';
import { Text } from './Text';

export interface ContractRow {
  id: string;
  who: string;
  product: string;
  month: number;
  /** 원 단위 */
  target: number;
  predicted: number;
  status: PaymentStatus;
}

const won = (v: number) => `${Math.round(v / 1e4).toLocaleString('ko-KR')}만원`;

const columns: ColumnDef<ContractRow>[] = [
  {
    accessorKey: 'who',
    header: '계약자(가명)',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <Text variant="body" as="strong" className="font-bold">
          {row.original.who}
        </Text>
        <Text variant="caption" tone="muted">
          {row.original.id}
        </Text>
      </div>
    ),
  },
  {
    accessorKey: 'product',
    header: '상품',
    cell: ({ getValue }) => (
      <span className="text-ink-2">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'month',
    header: '경과',
    meta: { align: 'right' },
    cell: ({ getValue }) => `${getValue<number>()}회차`,
  },
  {
    accessorKey: 'target',
    header: '월 대상보험료',
    meta: { align: 'right' },
    cell: ({ getValue }) => won(getValue<number>()),
  },
  {
    accessorKey: 'predicted',
    header: '예측 납입액',
    meta: { align: 'right' },
    cell: ({ row }) => (
      <strong
        className={cn(
          'text-body font-bold',
          row.original.status === 'unpaid' && 'text-risk',
        )}
      >
        {won(row.original.predicted)}
      </strong>
    ),
  },
  {
    accessorKey: 'status',
    header: '예측 상태',
    enableSorting: false,
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

/** shadcn Data Table 패턴 (TanStack Table + shadcn Table). 헤더를 누르면 정렬. */
export function ContractTable({ data }: { data: ContractRow[] }) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'predicted', desc: false },
  ]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table className="text-body min-w-[640px] border-separate border-spacing-0">
      <TableHeader className="[&_tr]:border-0">
        {table.getHeaderGroups().map((hg) => (
          <TableRow key={hg.id} className="hover:bg-transparent">
            {hg.headers.map((h) => {
              const right =
                (h.column.columnDef.meta as { align?: string } | undefined)
                  ?.align === 'right';
              return (
                <TableHead
                  key={h.id}
                  className={cn(
                    'border-border bg-background text-muted-foreground text-label h-11 border-y px-4',
                    right && 'text-right',
                  )}
                >
                  {h.column.getCanSort() ? (
                    <button
                      type="button"
                      onClick={h.column.getToggleSortingHandler()}
                      className={cn(
                        'inline-flex items-center gap-1',
                        right && 'flex-row-reverse',
                      )}
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      <ArrowUpDown className="size-3.5" aria-hidden />
                    </button>
                  ) : (
                    flexRender(h.column.columnDef.header, h.getContext())
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="hover:bg-background border-0 transition-colors [&:last-child>td]:border-b-0"
          >
            {row.getVisibleCells().map((cell) => {
              const right =
                (cell.column.columnDef.meta as { align?: string } | undefined)
                  ?.align === 'right';
              return (
                <TableCell
                  key={cell.id}
                  className={cn(
                    'border-border text-body border-b px-4 py-4',
                    right && 'text-ink-2 text-right tabular-nums',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
