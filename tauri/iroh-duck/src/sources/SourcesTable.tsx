import React, { useState } from "react"
import { useDispatch } from "react-redux"
import {
  ArrowTopRightOnSquareIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline"
import classNames from "classnames"

import Spinner from "../chrome/Spinner"
import Checkbox from "../forms/Checkbox"
import { Queryable } from "../types"
import { humanBytes } from "../util"
import { Tag } from "../chrome/Tag"
import { SlideOverType, setSlideOver } from "../slideOver/slideOvers"

export default function SourcesTable({
  items,
  loading,
}: { items: Queryable[]; loading: boolean }) {
  const dispatch = useDispatch()
  
  const [copiedIndex, setCopiedIndex] = useState(-1)
  const [selectedRows, setSelectedRows] = useState<number[]>([])


  const handleGatewayClick = (hash: string, format: "Raw" | "HashSeq") => {
    console.log(import.meta.env)
    // const urlFormat = formatToUrl(format)
    // window.open(
    //   `${GATEWAY_URL}/${username}/${project}/${urlFormat}/${hash}`,
    //   "_blank",
    // )
  }

  const handleHashCopy = async (hash: string, itemIdx: number) => {
    // navigator.clipboard.writeText(hash)
    // setCopiedIndex(itemIdx)
    // dispatch(pushInfoAlert("Copied hash to clipboard"))
    // setTimeout(() => {
    //   setCopiedIndex(-1)
    // }, 1300)
  }

  const handleTicketCopy = async (hash: string, itemIdx: number) => {
    // const res = await fetch(`${IROH_ANCHOR_API_PREFIX}ticket/${hash}`, {
    //   mode: "cors",
    //   credentials: "include",
    // }).then((res) => res.json())
    // navigator.clipboard.writeText(res.ticket)
    // dispatch(pushInfoAlert("Copied ticket to clipboard"))
    // setCopiedIndex(itemIdx)
    // setTimeout(() => {
    //   setCopiedIndex(-1)
    // }, 1300)
  }

  const handleShowDeleteModal = () => {
    // dispatch(
    //   showModal(ModalType.DELETE_BLOBS, {
    //     username,
    //     project,
    //     hashes: selectedRows.map((i) => items[i].hash),
    //     totalBytes: selectedRows.reduce((acc, i) => acc + items[i].size, 0),
    //   }),
    // )
  }

  return (
    <div>
      <div className="mt-12 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="min-h-[40px] p-2">
              {selectedRows.length > 0 && (
                <div className="flex">
                  <p className="mr-auto">
                    {selectedRows.length} blobs selected
                  </p>
                  <button
                    className="font-bold text-red-500 dark:text-red-500"
                    type="button"
                    onClick={() => {
                      handleShowDeleteModal()
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <table className="w-full">
              <thead className="sticky top-0 z-10 text-left font-space-mono text-sm text-zinc-500 dark:text-zinc-300">
                <tr>
                  <th scope="col">
                    <Checkbox
                      className="mb-0.5 ml-2"
                      checked={selectedRows.length === items.length}
                      onChange={(checked) => {
                        if (checked) {
                          setSelectedRows([...Array(items.length).keys()])
                        } else {
                          setSelectedRows([])
                        }
                      }}
                    />
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 pb-2">
                    Type
                  </th>
                  <th scope="col" className="px-3 pb-2">
                    Tags
                  </th>
                  <th scope="col" className="px-3 pb-2">
                    Size
                  </th>
                  <th scope="col" className="px-3 pb-2">
                    Ticket
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, itemIdx) => (
                  <tr
                    key={itemIdx}
                    className={classNames({
                      "bg-gray-50/5": itemIdx % 2 === 0,
                    })}
                  >
                    <td>
                      <Checkbox
                        className="ml-2"
                        checked={selectedRows.includes(itemIdx)}
                        onChange={(checked) => {
                          if (checked) {
                            setSelectedRows([...selectedRows, itemIdx])
                          } else {
                            setSelectedRows(
                              selectedRows.filter((i) => i !== itemIdx),
                            )
                          }
                        }}
                      />
                    </td>
                    <td className="text-ellipsis whitespace-nowrap py-3 pl-4 pr-3 text-sm text-zinc-900 dark:text-zinc-100 sm:pl-6">
                      <button
                        type="button"
                        className="max-w-sm cursor-pointer overflow-hidden font-mono text-ellipsis px-3 text-sm text-zinc-400"
                        onClick={() => {
                          dispatch(setSlideOver(SlideOverType.SOURCE_DETAILS, item))
                        }}
                      >
                        {item.name}
                      </button>
                    </td>
                    <td className="text-zinc-500">
                      {('sources' in item) ? `aggregation of ${item.sources.length} sources` : 'source'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-1 text-sm text-zinc-200">
                      <p>
                        {item.tags?.map((tag, i) => (
                          <Tag key={i}>{tag}</Tag>
                        ))}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">
                      {/* {humanBytes(item.size)} */}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <button
                        type="button"
                        onClick={() => {
                          // handleTicketCopy(item.hash, itemIdx)
                        }}
                      >
                        {copiedIndex === itemIdx ? (
                          <ClipboardDocumentCheckIcon className="h-4 w-4" />
                        ) : (
                          <ClipboardIcon className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && items.length === 0 && (
              <div className="mx-auto my-20 text-center text-black/20 dark:text-white/20">
                No blobs yet.
              </div>
            )}
            {loading && (
              <div className="mt-4 flex justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
