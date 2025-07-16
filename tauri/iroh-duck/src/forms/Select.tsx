import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import React, { Fragment } from "react"

interface SelectOption {
  name: string
}

type Props = {
  label?: string
  value: SelectOption
  options: SelectOption[]
  onChange: (value: SelectOption, i?: number) => void
  className?: string
}

export default function Select({
  label,
  options,
  value,
  onChange,
  className,
}: Props) {
  return (
    <div className={className}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-200">
                {label}
              </Listbox.Label>
            )}
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-600 sm:text-sm sm:leading-6">
                <span className="block truncate">{value.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-zinc-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-600 sm:text-sm">
                  {options.map((option, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "bg-indigo-600 text-white"
                            : "text-zinc-900 dark:text-zinc-500",
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate",
                            )}
                          >
                            {option.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}
