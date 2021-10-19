import { Provider } from "react-redux";

import Store from "./redux";
import Router from "./router";

function App() {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
}

export default App;
