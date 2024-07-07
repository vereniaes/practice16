"use server";

import { google } from "@/utils/arctic";
import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithGoogleAction() {
  //generate state codenya
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  // save codenya ke cookies

  cookies().set("codeVerifier", codeVerifier);

  //create auth URL
  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile"],
  });

  redirect(url.href);
}
