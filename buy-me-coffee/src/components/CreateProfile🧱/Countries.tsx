"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import axios from "axios"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandEmpty,
} from "@/components/ui/command"

interface CountrySelectProps {
    value: string;
    onChange: (value: string) => void;
    fieldState?: {
        invalid?: boolean;
        error?: { message?: string };
    };
}


export default function CountrySelect({ value, onChange, fieldState }: CountrySelectProps) {
    const [open, setOpen] = useState(false)
    const [countries, setCountries] = useState<any[]>([])

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => setCountries(res.data))
            .catch((err) => console.error("Error fetching countries:", err))
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className={cn(
                    "w-full justify-between",
                    fieldState?.invalid ? "text-red-500 border-red-500" : "text-gray-700"
                )}>
                    {value || "Select a country"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.cca3}
                                    value={country.name.common}
                                    onSelect={(val) => {
                                        onChange(val)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn("mr-2 h-4 w-4", value === country.name.common ? "opacity-100" : "opacity-0")}
                                    />
                                    {country.name.common}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
