import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function Auth() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return null;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

// export function auth() {
//   const token = cookies().get("token")?.value;

//   if (!token) {
//     return null;
//   }
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     return payload;
//   } catch (error) {
//     return null;
//   }
// }
