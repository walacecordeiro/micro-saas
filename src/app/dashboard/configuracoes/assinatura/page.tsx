import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function Page() {
 return (
  <Card>
   <CardHeader className="border-b border-border">
    <CardTitle>Plano e uso</CardTitle>
    <CardDescription>
     Você está atualmente no [plano_atual]. Ciclo de faturamento atual:
     [próxima_data_de_vencimento].
    </CardDescription>
   </CardHeader>
   <CardContent className="pt-6">
    <div className="space-y-2">
     <header className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">1/5</span>
      <span className="text-muted-foreground text-sm">20%</span>
     </header>
     <main>
      <Progress value={20} />
     </main>
    </div>
   </CardContent>
   <CardFooter className="flex items-center justify-between border-t pt-6">
    <span>Para um maior limite, assine o PRO</span>
    <Button>Upgrade para o PRO</Button>
   </CardFooter>
  </Card>
 );
}
