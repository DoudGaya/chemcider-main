"use client"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

// Import ReactQuill dynamically to avoid SSR issues
// @ts-ignore
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function WysiwygEditor({ value, onChange, placeholder = "Write something..." }: WysiwygEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  }

  const formats = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "indent", "link"]

  return (
    <div className="wysiwyg-editor">
      <ReactQuill
      // @ts-ignore
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="min-h-[200px]"
      />
      <style jsx global>{`
        .wysiwyg-editor .ql-container {
          min-height: 200px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          background: white;
        }
        .wysiwyg-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: white;
        }
      `}</style>
    </div>
  )
}

