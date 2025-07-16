import React, { Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useDispatch, useSelector } from "react-redux"

import SourceDetailsSideSheet from "../sources/SourceDetailsSideSheet"
import { AppState } from "../store"
import { SlideOverType, dismissSlideOver } from "./slideOvers"

export default function SlideOverLayout() {
  const { sheet, data } = useSelector((state: AppState) => state.slideOver)
  const open = sheet !== SlideOverType.NONE
  const cancelButtonRef = useRef(null)
  const dispatch = useDispatch()

  const close = () => {
    dispatch(dismissSlideOver())
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/20 backdrop-blur-sm transition-opacity dark:bg-gray-700/20" />
        </Transition.Child>

        <div className="fixed right-0 top-0 z-40 h-screen lg:top-0">
          <div className="flex h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-x-80"
              enterTo="translate-x-0"
              leave="ease-in duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-80"
            >
              <div className="relative mt-12 overflow-hidden shadow-lg sm:mt-0">
                {(() => {
                  switch (sheet) {
                    case SlideOverType.SOURCE_DETAILS:
                      return <SourceDetailsSideSheet data={data} />
                  }
                })()}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
