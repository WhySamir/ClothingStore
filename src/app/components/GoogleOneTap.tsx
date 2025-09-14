"use client";

import { useEffect } from "react";
import { createClient } from "@/utlis/supabase/client";

export default function GoogleOneTap() {
  useEffect(() => {
    const supabase = createClient();

    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) return; // skip if already logged in
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id:
          "60210776584-e2sca8mkb6j90i1tgvc52t393nljhq5o.apps.googleusercontent.com",
        callback: async (response) => {
          const { error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.credential,
          });
          if (error) console.error(error);
        },
        auto_select: false,
        cancel_on_tap_outside: false,
      });

      // for showings the floating bubble prompt
      window.google.accounts.id.prompt();
    };

    if (window.google) {
      init();
    } else {
      const check = setInterval(() => {
        if (window.google) {
          clearInterval(check);
          init();
        }
      }, 50);
    }
  }, []);

  return null; // no button, only floating prompt
}
