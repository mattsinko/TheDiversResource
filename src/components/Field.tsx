type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  error?: string;
  multiline?: boolean;
  placeholder?: string;
  maxLength: number;
  defaultValue?: string;
};

export function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  autoComplete,
  error,
  multiline,
  placeholder,
  maxLength,
  defaultValue,
}: FieldProps) {
  const id = `field-${name}-${label.replace(/\W+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;
  const className =
    "mt-1 block w-full rounded-lg border bg-white px-3 py-2.5 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 " +
    (error ? "border-red-500" : "border-slate-300");
  const shared = {
    id,
    name,
    required,
    autoComplete,
    placeholder,
    maxLength,
    defaultValue,
    className,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
        {optional && <span className="font-normal text-slate-500"> (optional)</span>}
      </label>
      {multiline ? <textarea rows={3} {...shared} /> : <input type={type} {...shared} />}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden from people; catches form-filling bots. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
