import classNames from "classnames"
import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

export interface TabItem {
  name: string
  href: string
  icon?: React.FC<any>
  current?: boolean
}

export default function Tabs({ tabs }: { tabs: TabItem[] }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  tabs = tabs.map((tab) => {
    if (tab.href === pathname) {
      return { ...tab, current: true }
    }
    return tab
  })

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.href === pathname)?.name}
          onChange={(event) => {
            const tab = tabs.find((tab) => tab.name === event.target.value)
            if (tab) {
              navigate(tab.href)
            }
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-black/10 dark:border-white/10">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-zinc-500 hover:border-gray-300 hover:text-irohPurple-500",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium",
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.icon && (
                  <tab.icon
                    className={classNames(
                      tab.current
                        ? "text-indigo-500"
                        : "text-zinc-400 group-hover:text-zinc-500",
                      "-ml-0.5 mr-2 h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                )}
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
