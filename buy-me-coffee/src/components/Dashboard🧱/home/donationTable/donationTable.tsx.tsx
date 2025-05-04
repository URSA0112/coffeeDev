"use client"

import { Card } from "@/components/ui/card"
import { columns } from "./columns" // your file with `ColumnDef<Payment>`
import { DataTable } from "@/components/ui/data-table"

const payments = [
  { id: "1", amount: 5, supporter: "John Doe", email: "john@example.com" },
  { id: "2", amount: 10, supporter: "Jane Smith", email: "jane@example.com" },
]

export default function DonationTablePage() {
  return (
    <Card className="p-4 m-2">
      <h2 className="text-xl font-bold mb-4">Donation List</h2>
      <DataTable columns={columns} data={payments} />
    </Card>
  )
}
