"use client";

import { useSession, signIn, signOut } from "next-auth/react"

export function LoginButton() {
  const { data: session } = useSession();

  console.log("session", session)

  if (session?.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}