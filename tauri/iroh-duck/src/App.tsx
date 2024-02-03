import React from "react";

import Terminal from "./Terminal";

export default function App() {
  return (
    <div className="w-screen h-screen bg-zinc-700 p-5">
      <Terminal />
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
