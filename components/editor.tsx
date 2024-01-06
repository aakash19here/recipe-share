"use client";
import React from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

//This is Back-up editor
export function Editor() {
  const ref = React.useRef<EditorJS>();
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const List = (await import("@editorjs/list")).default;
    const CheckList = (await import("@editorjs/checklist")).default;
    const NestedCheckList = (await import("@calumk/editorjs-nested-checklist"))
      .default;
    const NestedList = (await import("@editorjs/nested-list")).default;
    const Header = (await import("@editorjs/header")).default;
    const Warning = (await import("@editorjs/warning")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        onChange() {
          let data: OutputData;
          async function save() {
            data = await ref.current?.save();
            console.log(data);
          }
          save();
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        tools: {
          list: List,
          NestedList,
          CheckList,
          NestedCheckList,
          Header,
          Warning,
        },
      });
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return <div id="editor" className="min-h-[500px]" />;
}
