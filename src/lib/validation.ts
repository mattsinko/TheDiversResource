const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function field(form: FormData, name: string, max: number): string {
  const value = form.get(name);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function isEmail(value: string): boolean {
  return value.length <= 320 && EMAIL_RE.test(value);
}

/** Only short, plain tags like "dema" or "instagram" are kept. */
export function cleanSource(value: string): string {
  const v = value.toLowerCase();
  return /^[a-z0-9_-]{1,50}$/.test(v) ? v : "website";
}
