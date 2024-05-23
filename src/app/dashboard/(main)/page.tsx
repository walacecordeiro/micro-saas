import {
 DashboardPage,
 DashboardPageHeader,
 DashboardPageHeaderNav,
 DashboardPageHeaderTitle,
 DashboardPageMain,
} from "@/components/dashboard/page";
import { TodoDataTable } from "./_components/todo-data-table";
import { Button } from "@/components/ui/button";
import { TodoUpsertSheet } from "./_components/todo-upsert-sheet";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { getUserTodos } from "./actions";

export default async function Page() {
 const todos = await getUserTodos();
 return (
  <DashboardPage>
   <DashboardPageHeader>
    <DashboardPageHeaderTitle>Tarefas</DashboardPageHeaderTitle>
    <DashboardPageHeaderNav>
     <TodoUpsertSheet>
      <Button variant={"default"} size={"sm"}>
       <FilePlusIcon className="w-4 h-4 mr-2" />
       Adicionar tarefa
      </Button>
     </TodoUpsertSheet>
    </DashboardPageHeaderNav>
   </DashboardPageHeader>
   <DashboardPageMain>
    <TodoDataTable data={todos} />
   </DashboardPageMain>
  </DashboardPage>
 );
}
