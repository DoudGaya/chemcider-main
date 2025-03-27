"use client"

import { useState, useEffect } from "react"
import { Bold, Italic, List, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SimpleEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SimpleEditor({ value, onChange, placeholder = "Write something..." }: SimpleEditorProps) {
  const [editorValue, setEditorValue] = useState(value)

  // Update parent form when editor value changes
  useEffect(() => {
    onChange(editorValue)
  }, [editorValue, onChange])

  // Update editor when value prop changes
  useEffect(() => {
    setEditorValue(value)
  }, [value])

  const handleFormat = (format: string) => {
    let newValue = editorValue

    switch (format) {
      case "bold":
        newValue = `<strong>${getSelectedText()}</strong>`
        break
      case "italic":
        newValue = `<em>${getSelectedText()}</em>`
        break
      case "ul":
        newValue = `<ul>\n  <li>${getSelectedText()}</li>\n</ul>`
        break
      case "h2":
        newValue = `<h2>${getSelectedText()}</h2>`
        break
      case "h3":
        newValue = `<h3>${getSelectedText()}</h3>`
        break
      case "link":
        const url = prompt("Enter URL:")
        if (url) {
          newValue = `<a href="${url}" target="_blank" rel="noopener noreferrer">${getSelectedText()}</a>`
        }
        break
      default:
        break
    }

    // Insert the formatted text at cursor position
    const textarea = document.getElementById("simple-editor") as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = textarea.value.substring(start, end)

      if (selectedText) {
        const newText = textarea.value.substring(0, start) + newValue + textarea.value.substring(end)
        setEditorValue(newText)
      }
    }
  }

  const getSelectedText = (): string => {
    const textarea = document.getElementById("simple-editor") as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      return textarea.value.substring(start, end) || "Text here"
    }
    return "Text here"
  }

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/50 border-b">
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("bold")} className="h-8 px-2 py-1">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("italic")}
          className="h-8 px-2 py-1"
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("h2")}
          className="h-8 px-2 py-1 text-sm font-semibold"
        >
          H2
          <span className="sr-only">Heading 2</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("h3")}
          className="h-8 px-2 py-1 text-sm font-semibold"
        >
          H3
          <span className="sr-only">Heading 3</span>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("ul")} className="h-8 px-2 py-1">
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => handleFormat("link")} className="h-8 px-2 py-1">
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
      </div>
      <textarea
        id="simple-editor"
        value={editorValue}
        onChange={(e) => setEditorValue(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[200px] p-3 focus:outline-none resize-y"
        rows={8}
      />
      <div className="p-2 border-t bg-muted/50 text-xs text-muted-foreground">
        <p>You can use HTML tags for formatting. Select text and use the toolbar to apply formatting.</p>
      </div>
    </div>
  )
}

