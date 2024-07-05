"use client";

import { useActionState } from "react";
import { loginAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <main className="flex h-screen justify-center items-center">
      <form action={formAction} className="w-[300px">
        <input
          name="email"
          defaultValue={state?.data?.email}
          placeholder="Email"
          type="email"
        />
        <input
          name="password"
          defaultValue={state?.data?.password}
          placeholder="Password"
          type="password"
        />
        <button disabled={pending}>Login</button>
        {state?.status === "success" ? (
          <div className="msg-success">{state.message}</div>
        ) : null}
        {state?.status === "error" ? (
          <div className="msg-error">{state.message}</div>
        ) : null}
      </form>
    </main>
  );
}
