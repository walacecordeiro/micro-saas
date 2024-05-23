"use client";

import * as React from "react";
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
 ColumnDef,
 ColumnFiltersState,
 SortingState,
 VisibilityState,
 flexRender,
 getCoreRowModel,
 getFilteredRowModel,
 getPaginationRowModel,
 getSortedRowModel,
 useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
 DropdownMenu,
 DropdownMenuCheckboxItem,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Todo } from "../types";
import { useRouter } from "next/navigation";
import { deleteTodo, upsertTodo } from "../actions";
import { toast } from "@/components/ui/use-toast";

type TodoDataTable = {
 data: Todo[];
};

export function TodoDataTable({ data }: TodoDataTable) {
 const router = useRouter();
 const [sorting, setSorting] = React.useState<SortingState>([]);
 const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
 const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
 const [rowSelection, setRowSelection] = React.useState({});

 const handleDeleteTodo = async (todo: Todo) => {
  await deleteTodo({ id: todo.id });
  router.refresh();

  toast({
   title: "Tarefa deletada",
   description: "A tarefa foi deletada com sucesso.",
  });
 };

 const handleToggleDoneTodo = async (todo: Todo) => {
  const doneAt = todo.doneAt ? null : new Date();

  await upsertTodo({ id: todo.id, doneAt });
  router.refresh();

  toast({
   title: "Tarefa modificada",
   description: "O estado da tarefa foi alterado com sucesso.",
  });
 };

 const columns: ColumnDef<Todo>[] = [
  {
   accessorKey: "status",
   header: "Status",
   cell: ({ row }) => {
    const { doneAt } = row.original;
    const status: "concluída" | "pendente" = doneAt ? "concluída" : "pendente";
    const variant: "default" | "outline" = doneAt ? "default" : "outline";

    return <Badge variant={variant}>{status}</Badge>;
   },
  },
  {
   accessorKey: "title",
   header: ({ column }) => {
    return (
     <Button variant="link" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      Título
      <CaretSortIcon className="ml-2 h-4 w-4" />
     </Button>
    );
   },
   cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
   accessorKey: "createdAt",
   header: () => <div className="text-center">Criada em</div>,
   cell: ({ row }) => {
    return (
     <div className="text-center font-medium">{row.original.createdAt.toLocaleDateString()}</div>
    );
   },
  },
  {
   id: "actions",
   enableHiding: false,
   cell: ({ row }) => {
    const todo = row.original;

    return (
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Abrir menu</span>
        <DotsHorizontalIcon className="h-4 w-4" />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
       <DropdownMenuLabel>Ações</DropdownMenuLabel>
       <DropdownMenuItem onClick={() => handleToggleDoneTodo(todo)}>
        {todo.doneAt ? "Marcar como pendente" : "Marcar como concluída"}
       </DropdownMenuItem>
       <DropdownMenuItem onClick={() => handleDeleteTodo(todo)}>Deletar</DropdownMenuItem>
       <DropdownMenuSeparator />
       <DropdownMenuItem onClick={() => navigator.clipboard.writeText(todo.id)}>
        Copiar ID da tarefa
       </DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>
    );
   },
  },
 ];

 const table = useReactTable({
  data,
  columns,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  state: {
   sorting,
   columnFilters,
   columnVisibility,
   rowSelection,
  },
 });

 return (
  <div className="w-full">
   <div className="flex items-center py-4">
    <Input
     placeholder="Procurar tarefa..."
     value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
     onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
     className="max-w-sm"
    />
    <DropdownMenu>
     <DropdownMenuTrigger asChild>
      <Button variant="outline" className="ml-auto">
       Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
      </Button>
     </DropdownMenuTrigger>
     <DropdownMenuContent align="end">
      {table
       .getAllColumns()
       .filter((column) => column.getCanHide())
       .map((column) => {
        const columnNames: Record<string, string> = {
         title: "Título",
         status: "Status",
         createdAt: "Data de criação",
        };
        return (
         <DropdownMenuCheckboxItem
          key={column.id}
          className="capitalize"
          checked={column.getIsVisible()}
          onCheckedChange={(value) => column.toggleVisibility(!!value)}
         >
          {columnNames[column.id] || column.id}
         </DropdownMenuCheckboxItem>
        );
       })}
     </DropdownMenuContent>
    </DropdownMenu>
   </div>
   <div className="rounded-md border overflow-auto h-[60vh]">
    <Table>
     <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
       <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
         return (
          <TableHead key={header.id}>
           {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
         );
        })}
       </TableRow>
      ))}
     </TableHeader>
     <TableBody>
      {table.getRowModel().rows?.length ? (
       table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
         {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
           {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
         ))}
        </TableRow>
       ))
      ) : (
       <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
         {(table.getColumn("title")?.getFilterValue() as string)
          ? "Nenhuma tarefa com este título encontrada."
          : "Nenhuma tarefa adicionada."}
        </TableCell>
       </TableRow>
      )}
     </TableBody>
    </Table>
   </div>
   <div className="flex items-center justify-end space-x-2 py-4">
    <div className="flex-1 text-sm text-muted-foreground">
     {table.getFilteredRowModel().rows.filter((row) => row.original.doneAt).length}{" "}
     {table.getFilteredRowModel().rows.filter((row) => row.original.doneAt).length === 1
      ? "tarefa concluída"
      : "tarefas concluídas"}{" "}
     de {table.getFilteredRowModel().rows.length}{" "}
     {table.getFilteredRowModel().rows.length === 1 ? "tarefa" : "tarefas"}
    </div>

    <div className="space-x-2">
     <Button
      variant="outline"
      size="sm"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
     >
      Anterior
     </Button>
     <Button
      variant="outline"
      size="sm"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
     >
      Próxima
     </Button>
    </div>
   </div>
  </div>
 );
}
