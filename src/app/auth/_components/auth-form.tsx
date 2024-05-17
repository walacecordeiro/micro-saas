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
    title: "Um email de verificacão enviado",
    description: "Comfirme em sua caixa de email",
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
     <CardTitle className="text-3xl font-bold">Sign in with magic link</CardTitle>
     <CardDescription>Enter your email below to receive a magic link to sign in.</CardDescription>
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
      <Button className="w-full" type="submit">
       Send magic link
      </Button>
     </form>
    </CardContent>
   </Card>
  </div>
 );
}
