import type { FormState } from "@/app/actions/signup";

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-cyan-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-60"
    >
      {pending ? "Sending…" : children}
    </button>
  );
}

export function FormStatus({ state, fallback }: { state: FormState; fallback?: string }) {
  if (state.status === "success") {
    return (
      <p role="status" className="rounded-lg bg-emerald-50 p-4 text-base text-emerald-800">
        {state.message ?? fallback}
      </p>
    );
  }
  if (state.status === "error" && state.message) {
    return (
      <p role="alert" className="text-sm text-red-600">
        {state.message}
      </p>
    );
  }
  return null;
}
