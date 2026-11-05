"use server";

import { getSupabaseAdmin } from "@/lib/supabase";
import { cleanSource, field, isEmail } from "@/lib/validation";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** What was typed, so a failed submit doesn't wipe the form. */
  values?: Record<string, string>;
};

const NOT_CONNECTED =
  "Sign-ups aren't switched on yet. Please try again soon.";
const GENERIC_ERROR =
  "Something went wrong saving your details. Please try again.";

/**
 * Saves a row, or, when Supabase isn't connected, prints it to the terminal
 * in development so the forms can be tried locally without any keys.
 */
async function save(table: string, row: Record<string, string | null>) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[no Supabase keys] would save to ${table}:`, row);
      return { ok: true as const };
    }
    console.error(`Supabase is not configured; dropped a ${table} sign-up.`);
    return { ok: false as const, message: NOT_CONNECTED };
  }
  const { error } = await supabase.from(table).insert(row);
  // 23505 = already on the list. Treat as success so we don't reveal who signed up.
  if (error && error.code !== "23505") {
    console.error(`Failed to save ${table} sign-up:`, error.message);
    return { ok: false as const, message: GENERIC_ERROR };
  }
  return { ok: true as const };
}

function typed(row: Record<string, string | null>): Record<string, string> {
  return Object.fromEntries(Object.entries(row).map(([k, v]) => [k, v ?? ""]));
}

/** A hidden field real people never fill in; bots usually do. */
function isBot(form: FormData) {
  return field(form, "website", 200) !== "";
}

export async function submitShopLead(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  if (isBot(form)) return { status: "success" };

  const row = {
    business_name: field(form, "business_name", 200),
    contact_name: field(form, "contact_name", 200),
    email: field(form, "email", 320).toLowerCase(),
    phone: field(form, "phone", 50) || null,
    region: field(form, "region", 200),
    notes: field(form, "notes", 2000) || null,
    source: cleanSource(field(form, "source", 50)),
  };

  const errors: Record<string, string> = {};
  if (!row.business_name) errors.business_name = "Please enter your shop's name.";
  if (!row.contact_name) errors.contact_name = "Please enter your name.";
  if (!isEmail(row.email)) errors.email = "Please enter a valid email address.";
  if (!row.region) errors.region = "Please tell us where you're based.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values: typed(row) };
  }

  const result = await save("shop_leads", row);
  if (!result.ok) return { status: "error", message: result.message, values: typed(row) };
  return {
    status: "success",
    message: `Thanks, ${row.contact_name}! We'll be in touch about founding-shop listings before launch.`,
  };
}

export async function submitDiverSignup(
  _prev: FormState,
  form: FormData,
): Promise<FormState> {
  if (isBot(form)) return { status: "success" };

  const email = field(form, "email", 320).toLowerCase();
  if (!isEmail(email)) {
    return { status: "error", errors: { email: "Please enter a valid email address." }, values: { email } };
  }

  const result = await save("diver_signups", {
    email,
    source: cleanSource(field(form, "source", 50)),
  });
  if (!result.ok) return { status: "error", message: result.message, values: { email } };
  return {
    status: "success",
    message: "You're on the list. We'll email you when we launch.",
  };
}
