"use server";

import { prisma } from "@/utils/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  //find user for check user email in database
  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  //email not found
  if (!findUser) {
    return {
      status: "error",
      message: "User not Found",
      data: {
        email,
        password,
      },
    };
  }

  //matching user's password in database and bcrypt
  const isPasswordMatch = await bcrypt.compare(password, findUser.password);

  if (!isPasswordMatch) {
    return {
      status: "error",
      message: "Invalid Credential",
      data: {
        email,
        password,
      },
    };
  }

  //giving access or giving token to user
  const payload = {
    id: findUser.id,
    name: findUser.name,
    email: findUser.email,
  };

  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
  cookies().set("token", jwtToken, { httpOnly: true, secure: true });

  redirect("/dashboard");
}
