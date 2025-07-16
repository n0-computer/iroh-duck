import React from "react"
import { useDispatch } from "react-redux"
import { Dialog } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"

import { dismissSlideOver } from "./slideOvers"

interface SideSheetProps {
  title?: string
  children: React.ReactNode
}

export default function SlideOver({ title, children }: SideSheetProps) {
  const dispatch = useDispatch()
  const handleDismiss = () => {
    dispatch(dismissSlideOver())
  }

  return (
    <Dialog.Panel className="h-full bg-white px-6 pb-4 pt-5 text-left shadow-xl transition-all duration-200 dark:bg-zinc-900">
      <XMarkIcon
        onClick={handleDismiss}
        className="absolute right-5 top-5 h-6 w-6 cursor-pointer text-zinc-400 hover:text-zinc-500 dark:text-zinc-600"
      />
      <Dialog.Title
        as="h3"
        className="font-space-mono text-lg leading-6 text-zinc-900 dark:text-zinc-300"
      >
        {title}
      </Dialog.Title>
      {children}
    </Dialog.Panel>
  )
}
