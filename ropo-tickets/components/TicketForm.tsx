"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import { set, z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { Ticket } from "@prisma/client";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}
const TicketForm = ({ ticket }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("false");
  const router = useRouter();
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      if (ticket) {
        await axios.patch("/api/tickets/" + ticket.id, values); //updating a ticket
      } else {
        await axios.post("/api/tickets", values); //creating a ticket
      }

      setIsSubmitting(false);

      router.push("/tickets");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Unknown Error Occurred");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Title.." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name="description"
            defaultValue={ticket?.description}
            control={form.control}
            render={({ field }) => (
              <SimpleMDE placeholder="description" {...field} />
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Status..."
                          defaultValue={ticket?.status}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority..." defaultValue={ticket?.priority}/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="rounded-md">
            {ticket? "Update Ticket" : "Create Ticket"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
