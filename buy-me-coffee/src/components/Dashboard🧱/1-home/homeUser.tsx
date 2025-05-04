import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function HomeCreatorCard() {
  return (
    <section className="m-2">
      <Card className="p-8">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <Avatar className="my-auto">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="my-auto"><h2 className="font-bold">JAKE</h2><p>link</p></span>

          </div>
          <Button className="w-35">Share page link</Button>
        </div>


        <div className="flex gap-5 p-2">
          <h1 className="my-auto font-bold">Earnings</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">last 7 days</SelectItem>
              <SelectItem value="dark">last 30 days</SelectItem>
              <SelectItem value="system">last 45 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-4xl">$450</p>
      </Card>
    </section>
  )
}
