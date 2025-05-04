"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  supporter: string
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "supporter",
    header: "Supporter",
  },
  {
    accessorKey: "email",
    header: "Comment",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
