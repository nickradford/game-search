import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useInterval from 'use-interval';

import { setRandomBackground } from '../redux/slices/application';

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
