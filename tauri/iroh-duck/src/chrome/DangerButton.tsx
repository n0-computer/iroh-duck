import React from "react"
import { useLongPress } from "use-long-press"

export default function DangerButton(params: {
  children: string
  onClick: () => void
}) {
  const { children, onClick } = params

  const bind = useLongPress(
    () => {
      onClick()
    },
    {
      threshold: 2000,
    },
  )

  return (
    <button
      type="button"
      className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      {...bind()}
    >
      {children}
    </button>
  )
}
