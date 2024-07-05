"use client";

import { createNoteData } from "@/actions/createNote";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const NoteForm = () => {
  //   const router = useRouter();

  //   const [tittle, setTittle] = useState("");
  //   const [content, setContent] = useState("");

  //   //API PAKE CARA LAMA
  //   async function handleCreateData() {
  //     const rest = await fetch("https://v1.appbackend.io/v1/rows/WULeKzuIpzT6", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify([{ tittle, content }]),
  //     });

  //     router.refresh();
  //     setTittle("");
  //     setContent("");
  //   }

  return (
    <form action={createNoteData}>
      <input name="tittle" />
      <textarea name="content"></textarea>
      <button>Create</button>
    </form>
  );
};
