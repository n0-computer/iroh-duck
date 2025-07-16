import classNames from "classnames"
import React from "react"

interface TextAreaProps {
  id?: string
  label?: string
  name: string
  value: string
  onChange: (v: string) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  tabIndex?: number
  rows?: number
  autoComplete?: string
  validation?: (v: string) => string | undefined
  showValidation?: boolean
}

export default function Textarea(props: TextAreaProps) {
  const {
    id,
    label,
    name,
    value,
    onChange,
    onKeyUp,
    placeholder,
    disabled,
    required,
    className,
    tabIndex,
    rows,
    autoComplete,
    validation,
    showValidation,
  } = props
  const validationMessage = validation ? validation(value) : undefined
  const valid = validationMessage === undefined

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-200"
        >
          {label}
        </label>
      )}
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 dark:bg-zinc-800">
        <textarea
          id={id}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          className={classNames(
            "block h-32 w-full flex-1 resize-none border-0 bg-transparent py-1.5 pl-2 font-space-mono text-zinc-900 placeholder:text-zinc-400 focus:ring-0 dark:text-zinc-200 sm:text-sm sm:leading-6",
            showValidation &&
              !valid &&
              "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500",
          )}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          tabIndex={tabIndex}
          onKeyUp={onKeyUp}
          autoComplete={autoComplete}
          rows={rows}
        />
        {showValidation && validation && (
          <p className="mt-2 text-xs text-red-500">{validationMessage}</p>
        )}
      </div>
    </div>
  )
}
