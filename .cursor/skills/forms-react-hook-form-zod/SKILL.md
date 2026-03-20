---
name: forms-react-hook-form-zod
description: Describes how this repo builds validated forms using react-hook-form + zod + zodResolver. Use when implementing new inputs, validation, or form submission UI.
---

# React Hook Form + Zod Form Conventions

## Primary example

- Login screen: `app/(auth)/index.tsx`

## Validation schema

- Schema is built with `zod` and used via `zodResolver`.
- Types are inferred from the schema using `z.infer<typeof schema>`.

## Form state and usage

- `useForm<LoginFormValues>`:
  - `resolver: zodResolver(loginSchema)`
  - `mode: "onChange"`
  - `defaultValues: { ... }`
- `Controller` is used to bridge `TextInput` with react-hook-form.

## Error display pattern

- Errors come from `formState.errors`.
- Each field’s error is rendered near the corresponding input.

## Submission pattern

- Use `handleSubmit(onSubmit)` for submit triggers.
- Disable submission based on both:
  - mutation pending state
  - `isSubmitting`
  - and form validity (`isValid`)

## Concrete references

- `app/(auth)/index.tsx`
- `@hookform/resolvers/zod` usage
