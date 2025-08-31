"use client"

// Legacy auth form is unused now that Clerk handles auth pages.
// Keep a minimal stub to satisfy imports from the old auth page component.
export function AuthForm({
  goto,
  creating,
}: {
  goto?: string
  creating?: boolean
}) {
  return null
}
