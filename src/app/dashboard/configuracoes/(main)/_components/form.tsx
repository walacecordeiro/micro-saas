"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateProfile } from "../actions";
import { updateProfileSchema } from "../schema";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProfileFormProps = {
 defaultValues: Session["user"];
};

export function ProfileForm({ defaultValues }: ProfileFormProps) {
 const router = useRouter();

 const form = useForm<z.infer<typeof updateProfileSchema>>({
  resolver: zodResolver(updateProfileSchema),
  defaultValues: {
   name: defaultValues?.name ?? "",
   email: defaultValues?.email ?? "",
  },
 });

 const onSubmit = form.handleSubmit(async (data) => {
  await updateProfile(data);
  router.refresh();

  toast({
   title: "Sucesso",
   description: "Perfil atualizado com sucesso!",
  });
 });
 return (
  <Form {...form}>
   <form onSubmit={onSubmit} className="space-y-8 flex flex-col">
    <Card>
     <CardHeader>
      <CardTitle>Atualizar Nome</CardTitle>
      <CardDescription>Atualize o nome que será exibido no seu perfil.</CardDescription>
     </CardHeader>
     <CardContent>
      <FormField
       control={form.control}
       name="name"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Nome do perfil</FormLabel>
         <FormControl>
          <Input placeholder="Insira o nome que desejar" {...field} />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />
     </CardContent>
    </Card>

    <Card>
     <CardHeader>
      <CardTitle>Alterar Email</CardTitle>
      <CardDescription>
       Para alterar o email, é necessário entrar em contato com o suporte.
      </CardDescription>
     </CardHeader>
     <CardContent>
      <FormField
       control={form.control}
       name="email"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Email atual</FormLabel>
         <FormControl>
          <Input disabled placeholder="Insira seu email..." {...field} />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />
     </CardContent>
    </Card>
    <SheetFooter>
     <Button disabled={form.formState.isSubmitting} type="submit">
      {form.formState.isSubmitting ? "Salvando..." : "Salvar alterações"}
     </Button>
    </SheetFooter>
   </form>
  </Form>
 );
}
