import { render, screen, fireEvent } from "@testing-library/react";
import * as supabaseClient from "@/utlis/supabase/client";
import SignInButton from "../../components/buttons/SignInButton";

jest.mock("@/utlis/supabase/client");

describe("SignInButton", () => {
  it("calls Supabase signInWithOAuth when button is clicked", async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ data: {}, error: null });
    (supabaseClient.createClient as jest.Mock).mockReturnValue({
      auth: { signInWithOAuth: mockSignIn },
    });

    render(<SignInButton buttonText="Login" />);
    fireEvent.click(screen.getByText("Login"));

    expect(mockSignIn).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: expect.any(String),
        scopes: "email",
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
  });
});
