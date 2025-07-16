import classNames from "classnames"
import React from "react"

export default function Page({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={classNames(
        "max-w-5xl mx-auto pt-24 pb-32 px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  )
}
