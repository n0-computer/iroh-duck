import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import React from "react"

import { serverErrorString } from "../services/irohApi"

export default function ErrorMessage({
  server,
  client,
}: {
  server?: FetchBaseQueryError | SerializedError | undefined
  client?: string | undefined
}) {
  let message
  if (server) {
    message = serverErrorString(server)
  } else if (client) {
    message = client
  }

  if (message) {
    return (
      <div
        className="mb-4 mt-2 rounded bg-red-50 p-2 text-sm font-semibold text-red-500 dark:bg-red-400 dark:text-red-900"
        aria-label="Error"
      >
        {message}
      </div>
    )
  }
  return null
}
