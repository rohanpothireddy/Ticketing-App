import React from "react";
import dynamic from "next/dynamic";


interface EditTicketProps {
  params: {
    id: string;
  };
}
const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const EditTicket = async ({ params }: EditTicketProps) => {
  const ticket = await prisma?.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if(!ticket){
    return <p className="text-destructive">Ticket not found</p>;
  }
  

  return <TicketForm ticket={ticket} />;
};

export default EditTicket;
