"use server";

export async function createNoteData(formData) {
  const tittle = formData.get("tittle");
  const content = formData.get("content");

  //data
  console.log({ tittle, content });
}
