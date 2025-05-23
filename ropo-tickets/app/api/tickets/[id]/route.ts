import { ticketSchema } from "@/ValidationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!ticket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }
  const updatedTicket = await prisma.ticket.update({
    where: {
      id: ticket.id,
    },
    data: {
      ...body,
    },
  });
  if (!updatedTicket) {
    return NextResponse.json(
      { message: "Failed to update ticket" },
      { status: 500 }
    );
  }
  return NextResponse.json(updatedTicket, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!ticket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }
  const deletedTicket = await prisma.ticket.delete({
    where: {
      id: ticket.id,
    },
  });
  if (!deletedTicket) {
    return NextResponse.json(
      { message: "Failed to delete ticket" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
}
