"use client";

import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  ReactSlashMenuItem,
  getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import React, { useEffect } from "react";
import "@blocknote/core/style.css";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { recipes } from "@/lib/db/schema/recipe";

interface BlockNoteProps {
  recipe: Pick<typeof recipes.$inferSelect, "id" | "steps">;
  form: any;
}

export default function BlockNote({ recipe, form }: BlockNoteProps) {
  const slashMenuItems: ReactSlashMenuItem[] = getDefaultReactSlashMenuItems();
  const newSlashMenuItems = slashMenuItems.filter((i) => i.name !== "Image");
  const [content, setContent] = useLocalStorage(`recipe_${recipe.id}`, []);

  const editor: BlockNoteEditor = useBlockNote({
    slashMenuItems: newSlashMenuItems,
    //@ts-expect-error
    initialContent: recipe.steps ? recipe.steps : content,
    onEditorContentChange(editor) {
      form.setValue("steps", editor.topLevelBlocks);
      if (!recipe.steps) {
        form.setValue("steps", content);
        setContent(editor.topLevelBlocks);
      }
    },
  });

  return (
    <>
      <BlockNoteView editor={editor} theme={"light"} />
    </>
  );
}
