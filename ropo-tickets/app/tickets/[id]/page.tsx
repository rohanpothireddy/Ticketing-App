import React from "react";
import prisma from "@/prisma/db";
import TicketDetails from "./TicketDetails";

interface Props {
  params: {
    id: string;
  };
}

const ViewTicket = async ({ params }: Props) => {
  const ticket = await prisma?.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!ticket) {
    return <p className="text-destructive text-red-600">Ticket not found</p>;
  }
  return <TicketDetails ticket={ticket} />; // Pass the ticket data to TicketDetails component
};

export default ViewTicket;
