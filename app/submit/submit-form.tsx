"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitStoryAction } from "@/lib/actions"

const submitFormSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    url: z
      .string()
      .trim()
      .max(2048, { message: "URL is too long" })
      .optional(),
    text: z.string().optional(),
  })
  .refine((d) => (d.url?.trim() || d.text?.trim()), {
    path: ["url"],
    message: "Provide a URL or some text",
  })

export function SubmitForm() {
  const form = useForm<z.infer<typeof submitFormSchema>>({
    resolver: zodResolver(submitFormSchema),
    defaultValues: {
      title: "",
      url: "",
      text: "",
    },
  })

  return (
    <Form {...form}>
      <form action={submitStoryAction} className="max-w-[600px] space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} name="title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input {...field} name="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea className="h-32" {...field} name="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Submit
        </Button>
        <FormDescription>
          Leave url blank to submit a question for discussion. If there is no
          url, text will appear at the top of the thread. If there is a url,
          text is optional.
        </FormDescription>
      </form>
    </Form>
  )
}
