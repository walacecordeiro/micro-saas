"use client";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export function AuthForm() {
 const form = useForm();

 const handleSubmit = form.handleSubmit(async (data) => {
  try {
   await signIn("nodemailer", { redirect: false, email: data.email });

   toast({
    title: "O link foi enviado para seu e-mail",
    description: "Realize o login através do link",
   });
  } catch (error) {
   toast({
    title: "Erro",
    description: "Ocorreu um erro. Por favor tente novamente.",
   });
  }
 });

 return (
  <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
   <Card className="w-full max-w-md">
    <CardHeader className="space-y-1 text-center">
     <CardTitle className="text-3xl font-bold">Login com link mágico</CardTitle>
     <CardDescription>Insira seu e-mail abaixo para receber o link de login</CardDescription>
    </CardHeader>
    <CardContent>
     <form onSubmit={handleSubmit} className="space-y-4">
      <div>
       <Label className="sr-only" htmlFor="email">
        Email
       </Label>
       <Input
        className="w-full"
        id="email"
        placeholder="Enter your email"
        type="email"
        {...form.register("email")}
       />
      </div>
      <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
       {form.formState.isSubmitting ? "Enviando para seu e-mail" : "Pedir link mágico"}
      </Button>
     </form>
    </CardContent>
   </Card>
  </div>
 );
}
