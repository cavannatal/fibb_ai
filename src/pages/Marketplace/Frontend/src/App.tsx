import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MarketplaceHome from './pages/MarketplaceHome';
import LoRAsPage from './pages/LorasPage';
import DatasetsPage from './pages/DatasetsPage';
import WorkflowsPage from './pages/WorkflowsPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/marketplace" component={MarketplaceHome} />
            <Route path="/marketplace/loras" component={LoRAsPage} />
            <Route path="/marketplace/datasets" component={DatasetsPage} />
            <Route path="/marketplace/workflows" component={WorkflowsPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;