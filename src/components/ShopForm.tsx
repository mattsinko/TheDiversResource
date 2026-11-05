"use client";

import { useActionState } from "react";
import { submitShopLead, type FormState } from "@/app/actions/signup";
import { Field, Honeypot } from "./Field";
import { FormStatus, SubmitButton } from "./FormBits";

const initial: FormState = { status: "idle" };

export function ShopForm({ source }: { source: string }) {
  const [state, action, pending] = useActionState(submitShopLead, initial);

  if (state.status === "success") {
    return <FormStatus state={state} fallback="Thanks! We'll be in touch before launch." />;
  }

  const e = state.errors ?? {};
  const v = state.values ?? {};
  return (
    <form action={action} className="relative space-y-4" noValidate>
      <Honeypot />
      <input type="hidden" name="source" value={source} />
      <Field label="Shop or business name" name="business_name" required autoComplete="organization" defaultValue={v.business_name} maxLength={200} error={e.business_name} />
      <Field label="Your name" name="contact_name" required autoComplete="name" defaultValue={v.contact_name} maxLength={200} error={e.contact_name} />
      <Field label="Email" name="email" type="email" required autoComplete="email" defaultValue={v.email} maxLength={320} error={e.email} />
      <Field label="Phone" name="phone" type="tel" optional autoComplete="tel" defaultValue={v.phone} maxLength={50} />
      <Field label="Where are you based?" name="region" required placeholder="e.g. Key Largo, Florida" defaultValue={v.region} maxLength={200} error={e.region} />
      <Field label="Anything you'd like us to know?" name="notes" optional multiline defaultValue={v.notes} maxLength={2000} />
      <FormStatus state={state} />
      <SubmitButton pending={pending}>Register my shop&apos;s interest</SubmitButton>
    </form>
  );
}
