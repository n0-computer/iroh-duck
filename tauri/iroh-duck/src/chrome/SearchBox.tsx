import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import React from "react"

export default function SearchBox() {
  return (
    <div>
      <label
        htmlFor="search"
        className="sr-only block text-sm font-medium leading-6 text-gray-900"
      >
        Search
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <MagnifyingGlassIcon />
          {/* <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd> */}
        </div>
      </div>
    </div>
  )
}
