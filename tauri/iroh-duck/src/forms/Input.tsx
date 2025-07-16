import classNames from "classnames"
import React from "react"

interface InputProps {
  id?: string
  label?: string
  name: string
  value: string
  onChange: (v: string) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
  className?: string
  tabIndex?: number
  showValidation?: boolean
  validation?: (v: string) => string | undefined
}

export default function Input(props: InputProps) {
  const {
    id,
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    disabled,
    required,
    autoComplete,
    className,
    tabIndex,
    onKeyUp,
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
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          aria-label={label}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          onKeyUp={onKeyUp}
          tabIndex={tabIndex}
          className={classNames(
            "block w-full rounded border-0 px-2 py-1.5 tracking-wide text-zinc-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-zinc-500 focus:ring-irohPurple-600 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700 dark:focus:ring-irohPurple-600 sm:text-sm sm:leading-6",
            disabled && "opacity-50",
            showValidation &&
              !valid &&
              "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500",
          )}
        />
        {showValidation && validation && (
          <p className="mt-2 text-xs text-red-500">{validationMessage}</p>
        )}
      </div>
    </div>
  )
}
