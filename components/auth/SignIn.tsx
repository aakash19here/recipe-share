"use client";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const { status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="space-y-3">
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
