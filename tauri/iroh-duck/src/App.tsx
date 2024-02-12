import React, { useState } from "react";

import Terminal from "./Terminal";
import Blobs from "./Blobs";

export default function App() {
  const [tab, setTab] = useState("query");

  return (
    <div className="w-screen h-screen bg-zinc-700 p-5">
      <div className="flex">
        <a onClick={() => setTab("query")} className="cursor-pointer">query</a>
        <a onClick={() => setTab("blobs")} className="cursor-pointer">blobs</a>
      </div>
      {(() => {
        switch (tab) {
          case "query":
            return <Terminal />
          case "blobs":
            return <Blobs />
        }
      })()}
      {/* <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          query();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p> */}
    </div>
  );
}
