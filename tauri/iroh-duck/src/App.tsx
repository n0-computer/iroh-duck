import React, { useState } from "react";
import classNames from "classnames";

import Terminal from "./Terminal";
import Blobs from "./Blobs";
import Sources from "./sources/Sources";
import SlideOverLayout from "./slideOver/SlideOverLayout";

export default function App() {
  const [tab, setTab] = useState("sources");
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col h-full w-full bg-white antialiased dark:bg-zinc-900">
      <div className="p-5">
        <h3 className="text-2xl text-zinc-400">Iroh Duck</h3>
        <p className="text-zinc-500 mb-5 ">query the edge</p>
        <div className="flex mb-5 text-blue-500 text-lg font-bold text-uppercase">
          {[ "sources", "query", "cache" ].map((t) => (
            <a key={t} onClick={() => setTab(t)} className={classNames("cursor-pointer pr-5 transition-all text-zinc-300 hover:text-blue-500", t === tab && "text-blue-400")}>{t.toUpperCase()}</a>
          ))}
        </div>
      </div>
      <div className="p-5">
        {(() => {
          switch (tab) {
            case "sources":
              return <Sources />
            case "query":
              return <Terminal query={query} setQuery={setQuery} />
            case "cache":
              return <Blobs />
          }
        })()}
      </div>
      <SlideOverLayout />
    </div>
  );
}
