"use server";

import { prisma } from "@/utils/prisma";

import bcrypt from "bcrypt";

export async function registerAction(_, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const hashPassword = await bcrypt.hash(password, 10);

  //create data to database with prisma
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  return { messege: "user register success!" };
}
