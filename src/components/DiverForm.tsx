"use client";

import { useActionState } from "react";
import { submitDiverSignup, type FormState } from "@/app/actions/signup";
import { Field, Honeypot } from "./Field";
import { FormStatus, SubmitButton } from "./FormBits";

const initial: FormState = { status: "idle" };

export function DiverForm({ source }: { source: string }) {
  const [state, action, pending] = useActionState(submitDiverSignup, initial);

  if (state.status === "success") {
    return <FormStatus state={state} fallback="You're on the list. We'll email you when we launch." />;
  }

  return (
    <form action={action} className="relative space-y-4" noValidate>
      <Honeypot />
      <input type="hidden" name="source" value={source} />
      <Field label="Email" name="email" type="email" required autoComplete="email" maxLength={320} defaultValue={state.values?.email} error={state.errors?.email} />
      <FormStatus state={state} />
      <SubmitButton pending={pending}>Notify me at launch</SubmitButton>
    </form>
  );
}
