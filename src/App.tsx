
import * as React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { baseRoutes, renderRoutes } from 'routers';

interface Props {
}

class App extends React.Component<Props> {
  render() {
    return (
      <Router>
        <Switch>
          {renderRoutes(baseRoutes)}
        </Switch>
      </Router>
    );
  }
}

export default App;
