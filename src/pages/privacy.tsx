import * as React from 'react';

export function PrivacyPage() {
  return (
    <div className="bg-black p-4 rounded bg-opacity-75 max-w-3xl m-auto prose">
      <h1 className="italic">Privacy</h1>
      <p>
        <span className="font-bold italic">Game Search</span> does not under any circumstances store any information
        about our users.
      </p>
      <p>
        All features are implemented using your brower's LocalStorage or IndexedDB, and none of the information entered
        into the website is saved on any server operated by <span className="font-bold italic">Game Search</span>.
      </p>
      <p>
        We <span className="font-bold">do</span> use a 3rd party API for providing game data, as well as link to search
        engines when you search about a game.
      </p>
    </div>
  );
}
