import { Auth } from "@/libs/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  const user = Auth();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="h-screen flex">
      <aside className="w-[240px] bg-slate-50 p-8 space-y-4 font-medium">
        <div>Dasboard</div>
        <div>Course</div>
        <div>resource</div>
        <div>Certificate</div>
        <div>{user.name}</div>
      </aside>
      <section className="w-[calc(100%-240px)] p-8">{children}</section>
    </main>
  );
}
