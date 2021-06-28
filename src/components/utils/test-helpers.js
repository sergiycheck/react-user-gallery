import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import App from "../../App";
import { Provider } from 'react-redux';
import store from '../redux_components/store';



export function visit(url) {
  return render(

    <MemoryRouter initialEntries={[url]}>
      <QueryParamProvider ReactRouterRoute={Route}>

        <Provider store={store}>

          <App />

        </Provider>

      </QueryParamProvider>
    </MemoryRouter>

  );
}
