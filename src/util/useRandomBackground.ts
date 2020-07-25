import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useInterval from 'use-interval';

import { setRandomBackground } from '../redux/slices/application';

/**
 * A hook which works with the ApplicationSlice to update the application background on a set interval.
 *
 * @param interval number of milliseconds between background switches, default to 15000
 */
export function useRandomBackground(interval: number = 15000) {
  const dispatch = useDispatch();
  const [initialRender, setInitialRender] = useState(true);

  useInterval(() => {
    if (!initialRender) {
      dispatch(setRandomBackground());
    } else {
      setInitialRender(false);
    }
  }, interval);
}
