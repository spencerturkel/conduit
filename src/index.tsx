import * as React from "react";
import { render } from "react-snapshot";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
