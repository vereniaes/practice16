import { google } from "@/utils/arctic";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function GET(req) {
  // get the code
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const codeVerifier = cookies().get("codeVerifier").value;

  const tokens = await google.validateAuthorizationCode(code, codeVerifier);

  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
  const user = await res.json();

  // continue with google

  const findUser = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  // validation code === codeVerifier

  //check if exist
  if (!findUser) {
    //create account
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });

    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
    cookies().set("token", jwtToken);

    redirect("/dashboard");
  }

  //already have acc
  const payload = {
    id: findUser.id,
    name: findUser.name,
    email: findUser.email,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
  cookies().set("token", jwtToken);

  redirect("/dashboard");
}
