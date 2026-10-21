import { z } from 'zod'

// Error messages are message keys; forms translate them in the visitor's language.
export const algerianPhone = z
  .string()
  .transform((s) => s.replace(/[\s.()-]/g, ''))
  .pipe(z.string().regex(/^(?:\+213|00213|0)[5-7]\d{8}$/, 'phone'))

export type FormStatus = 'idle' | 'success' | 'error'

export type FormState<Field extends string = string> = {
  status: FormStatus
  fieldErrors?: Partial<Record<Field, string>>
  values?: Partial<Record<Field, string>>
  /** Set on success for flows that need a reference (orders). */
  reference?: string
}

export const initialFormState: FormState = { status: 'idle' }

export function fieldErrorsOf<Field extends string>(error: z.ZodError): Partial<Record<Field, string>> {
  const out: Partial<Record<Field, string>> = {}
  for (const issue of error.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && !(field in out)) out[field as Field] = issue.message
  }
  return out
}

export function formValues<Field extends string>(formData: FormData, fields: readonly Field[]) {
  const out: Partial<Record<Field, string>> = {}
  for (const f of fields) {
    const v = formData.get(f)
    if (typeof v === 'string') out[f] = v
  }
  return out
}
