"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { themeFormSchema } from "./schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";

export function ThemeForm() {
 const theme = useTheme();
 const form = useForm<z.infer<typeof themeFormSchema>>({
  resolver: zodResolver(themeFormSchema),
  defaultValues: {
   theme: theme.theme ?? "light",
  },
 });

 const onChange = async (data: { theme: "light" | "dark" }) => {
  theme.setTheme(data.theme);
  toast({
   title: "Tema atualizado",
   description: "Tema atualizado com sucesso!",
  });
 };

 return (
  <Form {...form}>
   <form className="space-y-8 flex flex-col">
    <Card>
     <CardHeader>
      <CardTitle>Selecione o Tema</CardTitle>
      <CardDescription>Escolha o tema para o painel de controle.</CardDescription>
     </CardHeader>
     <CardContent>
      <FormField
       control={form.control}
       name="theme"
       render={({ field }) => (
        <FormItem className="space-y-1">
         <FormMessage />
         <RadioGroup
          onValueChange={(value: "light" | "dark") => onChange({ theme: value })}
          defaultValue={field.value as "light" | "dark"}
          className="grid max-w-md grid-cols-2 gap-8 pt-2"
         >
          <FormItem>
           <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
            <FormControl>
             <RadioGroupItem value="light" className="sr-only" />
            </FormControl>
            <div className="items-center rounded-md border-2 border-muted p-1 transition duration-200 ease-in-out hover:cursor-pointer hover:scale-105 hover:border-primary">
             <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
               <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
               <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
               <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
               <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
               <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
               <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
             </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">Light</span>
           </FormLabel>
          </FormItem>
          <FormItem>
           <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
            <FormControl>
             <RadioGroupItem value="dark" className="sr-only" />
            </FormControl>
            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 transition duration-200 ease-in-out hover:cursor-pointer hover:scale-105 hover:border-primary">
             <div className="space-y-2 rounded-sm bg-slate-950 p-2">
              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
               <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
               <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
               <div className="h-4 w-4 rounded-full bg-slate-400" />
               <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
               <div className="h-4 w-4 rounded-full bg-slate-400" />
               <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
             </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">Dark</span>
           </FormLabel>
          </FormItem>
         </RadioGroup>
        </FormItem>
       )}
      />
     </CardContent>
    </Card>
   </form>
  </Form>
 );
}


