import type { z } from "zod";
import { persistentAtom, } from "@nanostores/persistent";
import { userSession } from "@/utils/schemas";

export type UserSession = z.infer<typeof userSession>;

const noUser = {
  session_id: "",
  email: "",
  iat: 0,
  exp: 0,
} as UserSession
;

export const $user = persistentAtom<z.infer<typeof userSession>>(
    "user",
    null,
    {
      encode: JSON.stringify,
      decode: JSON.parse,
    }
);
