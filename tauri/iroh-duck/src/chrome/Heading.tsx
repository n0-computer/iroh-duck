import classNames from "classnames"
import React from "react"

enum HeadingSize {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

const sizes = [
  null,
  HeadingSize.H1,
  HeadingSize.H2,
  HeadingSize.H3,
  HeadingSize.H4,
  HeadingSize.H5,
  HeadingSize.H6,
]

export default function Heading({
  size = 3,
  children,
  className,
}: {
  size: number
  children: React.ReactNode
  className?: string
}) {
  const heading = sizes[size] || HeadingSize.H3
  switch (heading) {
    case HeadingSize.H1:
      return (
        <h1
          className={classNames(
            "font-space-mono text-2xl leading-10",
            className,
          )}
        >
          {children}
        </h1>
      )
    case HeadingSize.H2:
      return (
        <h2
          className={classNames(
            "font-space-mono text-xl leading-10",
            className,
          )}
        >
          {children}
        </h2>
      )
    case HeadingSize.H3:
      return (
        <h3
          className={classNames(
            "font-space-mono text-lg leading-10",
            className,
          )}
        >
          {children}
        </h3>
      )
    case HeadingSize.H4:
      return (
        <h4
          className={classNames(
            "font-space-mono text-base leading-10",
            className,
          )}
        >
          {children}
        </h4>
      )
    case HeadingSize.H5:
      return (
        <h5
          className={classNames(
            "font-space-mono text-sm leading-10",
            className,
          )}
        >
          {children}
        </h5>
      )
    case HeadingSize.H6:
      return (
        <h6
          className={classNames(
            "font-space-mono text-xs leading-10",
            className,
          )}
        >
          {children}
        </h6>
      )
  }
}
