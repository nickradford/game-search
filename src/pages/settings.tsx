import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Button } from '../components/button';
import { purge, CombinedStateStructure } from '../redux/store';

import { SearchEngines, setSettingValue, SettingsKeys, SettingsSliceState } from '../redux/slices/settings';
import { useRandomBackground } from '../util/useRandomBackground';

export function SettingsPage() {
  function clearAllData() {
    confirmAlert({
      title: 'Delete all data',
      message: 'All of your favorites and previous searches will be deleted. Are you sure?',
      customUI: ({ title, message, onClose }) => {
        return (
          <div className="bg-black rounded prose p-4">
            <h1>{title}</h1>
            <p>{message}</p>
            <div className="flex justify-end">
              <Button
                className="bg-red-700 border-red-700 mr-2"
                onClick={() => {
                  purge();
                  onClose();
                }}
              >
                Yes, delete
              </Button>
              <Button onClick={() => onClose()}>Nevermind</Button>
            </div>
          </div>
        );
      },
    });
  }

  const { defaultSearchEngine, rotateBackground, rotateBackgroundInterval, wrapGameInQuotes } = useSelector<
    CombinedStateStructure,
    SettingsSliceState
  >((state) => state.settings);

  const dispatch = useDispatch();

  useRandomBackground();

  const setDefaultSearchEngine = (engine: string) =>
    dispatch(
      setSettingValue({
        key: SettingsKeys.DefaultSearchEngine,
        value: engine,
      })
    );

  const [localBgRandomInterval, setLocalBgRandomInterval] = useState(rotateBackgroundInterval);

  return (
    <div className="bg-black p-4 rounded bg-opacity-75 md:max-w-3xl m-auto prose w-full md:w-2/3 xl:w-1/2">
      <h1 className="italic">Settings</h1>

      <div className="mb-4">
        <label>Default Search Engine</label>
        <br />
        <Button
          className="mr-2"
          selected={defaultSearchEngine === SearchEngines.GOOGLE}
          onClick={() => setDefaultSearchEngine(SearchEngines.GOOGLE)}
        >
          {SearchEngines.GOOGLE}
        </Button>
        <Button
          selected={defaultSearchEngine === SearchEngines.DUCKDUCKGO}
          onClick={() => setDefaultSearchEngine(SearchEngines.DUCKDUCKGO)}
        >
          {SearchEngines.DUCKDUCKGO}
        </Button>
      </div>

      <div className="mb-4">
        <label>
          <span className="mr-2">Wrap game name in quotes?</span>
          <input
            type="checkbox"
            defaultChecked={wrapGameInQuotes}
            onChange={(e) => {
              dispatch(setSettingValue({ key: SettingsKeys.WrapGameInQuotes, value: e.target.checked }));
            }}
          />
        </label>
        <p className="text-xs">
          Search results may sometimes show up for other games in a series. Turn this on in order to wrap the game name
          in quotes to force the search engine to only show results which contain the specific game name.
        </p>
      </div>

      <div className="mb-4">
        <label>
          <span className="mr-2">Randomize background</span>
          <input
            type="checkbox"
            defaultChecked={rotateBackground}
            onChange={(e) => {
              dispatch(setSettingValue({ key: SettingsKeys.RotateBackground, value: e.target.checked }));
            }}
          />
        </label>
      </div>
      <form
        className="mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(setSettingValue({ key: SettingsKeys.RotateBackgroundInterval, value: localBgRandomInterval }));
        }}
      >
        <label>
          Background randomization interval (seconds)
          <input
            name="bgInterval"
            className="ml-2 mr-2 text-black"
            type="number"
            step={0.5}
            size={8}
            onChange={(e) => setLocalBgRandomInterval(e.target.valueAsNumber * 1000)}
            defaultValue={rotateBackgroundInterval / 1000}
          />
        </label>
        <Button selected={localBgRandomInterval !== rotateBackgroundInterval} type="submit">
          Save
        </Button>
      </form>

      <h3 className="text-white">Manage Data</h3>
      <p>All of your favorites and searches are saved in your browser's localstorage.</p>
      <Button className="uppercase border-red-700 text-red-700" onClick={clearAllData}>
        Clear all data
      </Button>
    </div>
  );
}
