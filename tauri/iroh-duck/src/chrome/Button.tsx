import classNames from "classnames"
import React from "react"
import { Link } from "react-router-dom"
import Spinner from "./Spinner"

function ArrowIcon(props: any) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

const variantStyles: Record<string, string> = {
  primary:
    "rounded-sm bg-irohPurple-500 py-1 px-3 text-white hover:bg-irohPurple-700 dark:bg-irohPurple-600 dark:ring-1 dark:ring-inset dark:ring-irohPurple-600/20 dark:hover:bg-irohPurple-600 dark:hover:text-irohPurple-300 dark:hover:ring-irohPurple-300",
  secondary:
    "rounded-sm bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300",
  filled:
    "rounded-sm bg-zinc-700 py-1 px-3 text-white hover:bg-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:text-zinc-100 dark:hover:bg-zinc-700",
  outline:
    "rounded-sm py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white",
  destructive:
    "rounded-sm px-3.5 py-2.5 bg-red-600 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  text: "text-irohPurple-500 hover:text-irohPurple-600 dark:text-irohPurple-600 dark:hover:text-irohPurple-500",
}

const sizeStyles: Record<string, string> = {
  sm: "text-xs py-0 px-0",
  md: "text-sm py-1 px-2",
  lg: "text-lg bold py-2 px-4",
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  href?: string
  metricsEventName?: string
  variant?:
    | "primary"
    | "secondary"
    | "filled"
    | "outline"
    | "destructive"
    | "text"
  size?: "sm" | "md" | "lg"
  arrow?: "left" | "right"
  loading?: boolean
  target?: "_self" | "_blank" | "_parent" | "_top"
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  metricsEventName,
  children,
  arrow,
  loading,
  target = "_self",
  ...props
}: ButtonProps) {
  className = classNames(
    "inline-flex gap-0.5 items-center justify-center overflow-hidden font-medium transition",
    variantStyles[variant],
    sizeStyles[size],
    className,
    metricsEventName && `plausible-event-name=${metricsEventName}`,
  )

  const arrowIcon = (
    <ArrowIcon
      className={classNames(
        "mt-0.5 h-5 w-5",
        variant === "text" && "relative top-px",
        arrow === "left" && "-ml-1 rotate-180",
        arrow === "right" && "-mr-1",
        size === "lg" && "h-4",
      )}
    />
  )

  if (props.href) {
    // TODO(b5): we can't splat {...props} here b/c types for link & button are different
    // so we have to manually pass in the props we want
    return (
      <Link
        key={props.key}
        className={className}
        to={props.href}
        aria-label={props["aria-label"]}
        target={target}
      >
        {arrow === "left" && arrowIcon}
        {children}
        {arrow === "right" && arrowIcon}
      </Link>
    )
  }

  if (loading) {
    return (
      <button {...props} disabled={true} className={className} type="button">
        <Spinner />
      </button>
    )
  }

  return (
    <button {...props} className={className} type="button">
      {arrow === "left" && arrowIcon}
      {children}
      {arrow === "right" && arrowIcon}
    </button>
  )
}
