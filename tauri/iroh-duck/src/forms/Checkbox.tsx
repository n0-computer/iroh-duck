import classNames from "classnames"
import React from "react"

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export default function Checkbox({
  checked,
  onChange,
  className,
}: CheckboxProps) {
  return (
    <input
      // id="candidates"
      // aria-describedby="candidates-description"
      // name="candidates"
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={classNames(
        "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600",
        className,
      )}
    />
  )
}
