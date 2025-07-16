import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

export const irohPurple = "#7C7CFF"
export const twZinc500 = "#71717a"

// Usernames can only have:
// - Lowercase Letters (a-z)
// - Numbers (0-9)
// - Dashes (-)
// - Underscores(_)
function isUsernameValid(username: string): boolean {
  return /^(?=[a-z0-9-_]{2,20}$)(?!.*[-_]{2})[^-_].*[^-_]$/.test(username)
}

export function validateUsername(username: string): string | undefined {
  const valid = isUsernameValid(username)
  if (valid) {
    return undefined
  }

  return "Username must be between 2 and 20 characters and can only contain lowercase letters, numbers, dashes, and underscores."
}

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateEmail(email: string): string | undefined {
  const valid = isEmailValid(email)
  if (valid) {
    return undefined
  }

  return "Please enter a valid email address."
}

// Project Names can only have:
// - Lowercase Letters (a-z)
// - Numbers (0-9)
// - Dashes (-)
function isProjectNameValid(username: string): boolean {
  return /^(?=[a-zA-Z0-9-_]{2,200}$)(?!.*[-_]{2})[^-_].*[^-_]$/.test(username)
}

export function validateProjectName(name: string): string | undefined {
  if (name.length === 0) {
    return "Project name cannot be empty."
  }
  if (!isProjectNameValid(name)) {
    return "Project name must be between 2 and 20 characters and can only contain letters, numbers, dashes, and underscores."
  }

  return undefined
}

function isPasswordValid(password: string): boolean {
  return password.length >= 8
}

export function validatePassword(password: string): string | undefined {
  const valid = isPasswordValid(password)
  if (valid) {
    return undefined
  }

  return "Password must be at least 8 characters long."
}

export function validateDocumentName(name: string): string | undefined {
  if (name.length === 0) {
    return "Document name cannot be empty."
  }
  if (name.length > 200) {
    return "Document name cannot be longer than 200 characters."
  }

  return undefined
}

export function validateApiKeyName(name: string): string | undefined {
  if (name.length === 0) {
    return "name cannot be empty."
  }
  if (name.length > 200) {
    return "name cannot be longer than 200 characters."
  }

  return undefined
}

export function validateDocumentTicket(ticket: string): string | undefined {
  if (ticket.length === 0) {
    return "ticket cannot be empty."
  }
  // ticket must start with "doc"
  if (!ticket.startsWith("doc")) {
    return 'Document ticket must start with "doc".'
  }

  return undefined
}

export function validateBlobTicket(ticket: string): string | undefined {
  if (ticket.length === 0) {
    return "ticket cannot be empty."
  }
  // ticket must start with "blob"
  if (!ticket.startsWith("blob")) {
    return 'Blob ticket must start with "blob".'
  }

  return undefined
}

// max upload size for a single file is 1gb
const MAX_UPLOAD_SIZE = 1024 * 1024 * 1024

export function validateFiles(files: FileList | null): string | undefined {
  if (!files) {
    return "No file selected."
  }
  if (files.length === 0) {
    return "No file selected."
  }

  const totalFileSize = Array.from(files).reduce(
    (acc, file) => acc + file.size,
    0,
  )
  if (totalFileSize > MAX_UPLOAD_SIZE) {
    return "Maximum upload is 1GB total."
  }

  return undefined
}

// a function that accepts a number of bytes and returns a human readable string
export function humanBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  return `${parseFloat((bytes / 1024 ** i).toFixed(2))} ${sizes[i]}`
}

// relative to now time string (e.g. 5 minutes ago)
// horrible rip-off from GitHub Copilot? Sure.
export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval > 1) return `${interval} years ago`

  interval = Math.floor(seconds / 2592000)
  if (interval > 1) return `${interval} months ago`

  interval = Math.floor(seconds / 86400)
  if (interval > 1) return `${interval} days ago`

  interval = Math.floor(seconds / 3600)
  if (interval > 1) return `${interval} hours ago`

  interval = Math.floor(seconds / 60)
  if (interval > 1) return `${interval} minutes ago`

  return `${Math.floor(seconds)} seconds ago`
}

// interpret a fetch error into a user-facing string.
export function errorIsStatusCode(
  err: FetchBaseQueryError | SerializedError,
  status: number,
): boolean {
  if ("status" in err) {
    // Error is of type FetchBaseQueryError
    if (typeof err.status === "number") {
      // TODO - HTTP status code interpretation, or do we just run with the error message?
      return err.status === status
    }
  }
  return false
}

export function statDurationString(value: StatDuration): string {
  switch (value) {
    case StatDuration.hour:
      return "hour"
    case StatDuration.twentyFourHours:
      return "24 hours"
    case StatDuration.sevenDays:
      return "7 days"
    default:
      return "hour"
  }
}

export function censorEmail(email: string): string {
  const [username, domain] = email.split("@")
  if (!username || !domain) {
    return email // or throw an error if invalid email
  }

  // Censor part of the username. Keep the first letter and the last letter visible.
  // Replace the middle characters with asterisks (*).
  const censoredUsername =
    username.length > 2
      ? username.charAt(0) +
        "*".repeat(username.length - 2) +
        username.charAt(username.length - 1)
      : `${username.charAt(0)}*`

  return `${censoredUsername}@${domain}`
}
