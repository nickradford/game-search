import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from 'use-interval';

import { setRandomBackground } from '../redux/slices/application';
import { CombinedStateStructure } from '../redux/store';
import { SettingsSliceState } from '../redux/slices/settings';

/**
 * A hook which works with the ApplicationSlice to update the application background on a set interval.
 *
 * @param intervalOverride number of milliseconds between background switches, default to 15000
 */
export function useRandomBackground(intervalOverride?: number) {
  const { rotateBackground, rotateBackgroundInterval } = useSelector<CombinedStateStructure, SettingsSliceState>(
    (state) => state.settings
  );

  const dispatch = useDispatch();
  const [initialRender, setInitialRender] = useState(true);

  const interval = intervalOverride || rotateBackgroundInterval;

  useInterval(() => {
    if (!rotateBackground) {
      return;
    }
    if (!initialRender) {
      dispatch(setRandomBackground());
    } else {
      setInitialRender(false);
    }
  }, interval);
}
