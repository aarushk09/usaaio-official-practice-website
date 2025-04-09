"use client"

import type { ReactNode } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BookmarkPlus } from "lucide-react"

interface GlossaryPopoverProps {
  children: ReactNode
  term: string
  definition: string
}

export default function GlossaryPopover({ children, term, definition }: GlossaryPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 bg-brand-navy border-brand-gray/30">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-medium text-white">{term}</h4>
          <button className="text-brand-teal hover:text-brand-blue">
            <BookmarkPlus size={16} />
          </button>
        </div>
        <p className="text-gray-300 mt-2">{definition}</p>
      </PopoverContent>
    </Popover>
  )
}
