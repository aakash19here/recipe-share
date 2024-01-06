"use client";

import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import React from "react";
import "@blocknote/core/style.css";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function BlockNote() {
  const slashMenuItems: ReactSlashMenuItem[] = getDefaultReactSlashMenuItems();
  const newSlashMenuItems = slashMenuItems.filter((i) => i.name !== "Image");
  const [content, setContent] = useLocalStorage("content", [
    { content: "hello block note" },
  ]);

  const editor: BlockNoteEditor = useBlockNote({
    slashMenuItems: newSlashMenuItems,
    initialContent: content,
    onEditorContentChange(editor) {
      //@ts-expect-error
      setContent(editor.topLevelBlocks);
    },
  });

  return (
    <>
      <BlockNoteView editor={editor} theme={"light"} />
    </>
  );
}
