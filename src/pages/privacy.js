import React from "react";

export function PrivacyPage() {
  return (
    <div className=" max-w-2xl m-auto">
      <h1 className="font-bold text-3xl mb-2">Privacy</h1>
      <p className="mb-4">
        <span className="font-bold italic">Game Search</span> does not under any
        circumstances store any information about our users.
      </p>
      <p className="mb-4">
        All features are implemented using your brower's LocalStorage or
        IndexedDB, and none of the information entered into the website is saved
        on any server operated by{" "}
        <span className="font-bold italic">Game Search</span>.
      </p>
      <p className="mb-4">
        We <span className="font-bold">do</span> use a 3rd party API for
        providing game data, as well as link to search engines when you search
        about a game.
      </p>
    </div>
  );
}
