import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers";

export function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [
    middlewareEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ];
  const composedEnhancers = compose(...enhancers);

  return createStore(rootReducer, preloadedState, composedEnhancers);
}
