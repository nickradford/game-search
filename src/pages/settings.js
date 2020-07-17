import React from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Button } from "../components/button";
import { purge } from "../redux/store";

import {
  SearchEngines,
  setSettingValue,
  SettingsKeys,
} from "../redux/slices/settings";

const mapStateToProps = ({ settings }) => {
  return { settings };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setDefaultSearchEngine: (engine) =>
      dispatch(
        setSettingValue({
          key: SettingsKeys.DefaultSearchEngine,
          value: engine,
        })
      ),
  };
};

function Settings({ settings, setDefaultSearchEngine }) {
  function clearAllData() {
    confirmAlert({
      title: "Delete all data",
      message:
        "All of your favorites and previous searches will be deleted. Are you sure?",
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
  return (
    <div className="bg-black p-4 rounded bg-opacity-75 max-w-3xl m-auto prose w-1/2">
      <h1 className="italic">Settings</h1>

      <div className="mb-4">
        <label>Default Search Engine</label>
        <br />
        <Button
          className="mr-2"
          selected={settings.defaultSearchEngine === SearchEngines.GOOGLE}
          onClick={() => setDefaultSearchEngine(SearchEngines.GOOGLE)}
        >
          {SearchEngines.GOOGLE}
        </Button>
        <Button
          selected={settings.defaultSearchEngine === SearchEngines.DUCKDUCKGO}
          onClick={() => setDefaultSearchEngine(SearchEngines.DUCKDUCKGO)}
        >
          {SearchEngines.DUCKDUCKGO}
        </Button>
      </div>

      <h3 className="text-white">Manage Data</h3>
      <p>
        All of your favorites and searches are saved in your browser's
        localstorage.
      </p>
      <Button
        className="uppercase border-red-700 text-red-700"
        onClick={clearAllData}
      >
        Clear all data
      </Button>
    </div>
  );
}

export const SettingsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
