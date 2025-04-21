import React from "react";
import { Badge } from "./ui/badge";
import { Status } from "@prisma/client";

interface TicketStatusBadgeProps {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "bg-red-400" | "bg-green-400" | "bg-blue-400" }
> = {
  OPEN: {
    label: "Open",
    color: "bg-red-400",
  },
  STARTED: {
    label: "Started",
    color: "bg-blue-400",
  },
  CLOSED: {
    label: "Closed",
    color: "bg-green-400",
  },
};

const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
  const mappedStatus = statusMap[status];

  if (!mappedStatus) {
    return null; // or return a fallback badge if you prefer
  }

  return (
    <Badge
      className={`${mappedStatus.color} text-background hover:${mappedStatus.color}`}
    >
      {mappedStatus.label}
    </Badge>
  );
};

export default TicketStatusBadge;
