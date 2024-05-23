"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
 Sheet,
 SheetContent,
 SheetDescription,
 SheetFooter,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from "@/components/ui/sheet";
import { useRef } from "react";
import {
 Form,
 FormField,
 FormItem,
 FormLabel,
 FormControl,
 FormDescription,
 FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Todo } from "../types";
import { upsertTodo } from "../actions";
import { upsertTodoSchema } from "../schema";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

type TodoUpsertSheetProps = {
 children?: React.ReactNode;
 defaultValue?: Todo;
};

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
 const ref = useRef<HTMLDivElement>(null);
 const router = useRouter();

 const form = useForm({
  resolver: zodResolver(upsertTodoSchema),
 });

 const onSubmit = form.handleSubmit(async (data) => {
  await upsertTodo(data);
  router.refresh();

  ref.current?.click();

  toast({
   title: "Sucesso",
   description: "A tarefa foi salva com sucesso!",
  });
 });

 return (
  <Sheet>
   <SheetTrigger asChild>
    <div ref={ref}>{children}</div>
   </SheetTrigger>
   <SheetContent>
    <Form {...form}>
     <form onSubmit={onSubmit} className="space-y-8 h-screen flex flex-col">
      <SheetHeader>
       <SheetTitle>Adicionar ou Editar Tarefa</SheetTitle>
       <SheetDescription>
        Faça alterações ou adicione uma nova tarefa aqui. Clique em salvar quando terminar.
       </SheetDescription>
      </SheetHeader>
      <FormField
       control={form.control}
       name="title"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Título</FormLabel>
         <FormControl>
          <Input placeholder="Insira o título da tarefa..." {...field} />
         </FormControl>
         <FormDescription>Este será o título exibido para a tarefa.</FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />
      <SheetFooter>
       <Button type="submit">Salvar alterações</Button>
      </SheetFooter>
     </form>
    </Form>
   </SheetContent>
  </Sheet>
 );
}
