import classNames from "classnames"
import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={classNames(
        "rounded px-4 py-5 bg-zinc-100 dark:bg-zinc-800 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  )
}
