import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { useTheme } from "../hooks/useTheme"

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const otherTheme = theme === "light" ? "dark" : "light"

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      className={classNames(
        "flex h-8 w-8 items-center justify-center rounded-md p-2 transition hover:bg-zinc-900/5 dark:hover:bg-white/5",
        className,
      )}
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      onClick={() => toggleTheme()}
    >
      <SunIcon className="h-5 w-5 stroke-zinc-900 dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 stroke-white dark:block" />
    </button>
  )
}
