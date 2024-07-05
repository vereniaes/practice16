"use client";

import { useActionState } from "react";
import { registerAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, {
    message: "",
  });

  return (
    <main className="flex h-screen justify-center items-center">
      <form action={formAction} className="w-[300px]">
        <input name="name" placeholder="Name" />
        <input name="email" placeholder="Email" type="email" />
        <input name="password" placeholder="Password" type="password" />
        <button disabled={pending}>Register</button>
        {state?.message !== "" ? <div>Register success</div> : null}
      </form>
    </main>
  );
}
