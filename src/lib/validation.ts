export const USERNAME_MAX_LENGTH = 50;
export const JOB_TITLE_MAX_LENGTH = 50;

// Spec didn't mention specific validation but since 'production ready' was mentioned I am assuming we expect
// at least some basic validation

export function validateUsername(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Username is required";
  if (trimmed.length < 2) return "Username must be at least 2 characters";
  if (trimmed.length > USERNAME_MAX_LENGTH) return `Username must be ${USERNAME_MAX_LENGTH} characters or less`;
  if (!/^[a-zA-Z0-9_\s]+$/.test(trimmed)) {
    return "Username can only contain letters, numbers, spaces, and underscores";
  }
  return undefined;
}

export function validateJobTitle(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Job title is required";
  if (trimmed.length < 2) return "Job title must be at least 2 characters";
  if (trimmed.length > JOB_TITLE_MAX_LENGTH) return `Job title must be ${JOB_TITLE_MAX_LENGTH} characters or less`;
  return undefined;
}
