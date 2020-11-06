import React from "react";
import ReactQuill from "react-quill";
function Editor({ placeholder, contentHtml, setContentHtml }) {
  const handleChange = (html) => {
    setContentHtml(html);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return (
    <>
      <ReactQuill
        theme={"snow"}
        onChange={handleChange}
        value={contentHtml}
        modules={modules}
        formats={formats}
        bounds={".rich-editor"}
        placeholder={placeholder}
      />
    </>
  );
}

export default Editor;
