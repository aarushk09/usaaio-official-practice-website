"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  onRun: () => void
  output: string
  readOnly?: boolean
}

export default function CodeEditor({ code, onChange, onRun, output, readOnly = false }: CodeEditorProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg overflow-hidden border border-brand-gray/30">
      {/* Editor Header */}
      <div className="bg-brand-navy/50 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm text-brand-teal">Python</span>
        </div>
        <div className="flex space-x-2">
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="bg-brand-black p-4">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full bg-transparent text-gray-300 font-mono text-sm focus:outline-none min-h-[200px]",
            readOnly ? "cursor-default" : "",
          )}
          readOnly={readOnly}
          spellCheck="false"
        />
      </div>

      {/* Editor Footer */}
      <div className="bg-brand-navy/30 px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={handleCopy}>
            {copied ? <Check size={16} className="mr-1" /> : <Copy size={16} className="mr-1" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        <Button
          size="sm"
          className={readOnly ? "bg-brand-gray/50" : "bg-brand-teal hover:bg-brand-blue"}
          onClick={onRun}
          disabled={readOnly}
        >
          <Play size={16} className="mr-1" />
          {readOnly ? "Read-Only" : "Run Code"}
        </Button>
      </div>

      {/* Output Panel */}
      {output && (
        <div className="border-t border-brand-gray/30">
          <div className="bg-brand-navy/50 px-4 py-2">
            <span className="text-sm text-brand-teal">Output</span>
          </div>
          <div className="bg-brand-black/50 p-4">
            <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
