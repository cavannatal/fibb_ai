import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';
import MarketplaceHome from './MarketplaceHome';
import LoRAsPage from './LoRAsPage';
import DatasetsPage from './DatasetsPage';
import WorkflowsPage from './WorkflowsPage';

const Marketplace: React.FC = () => {
  let { path } = useRouteMatch();

  useEffect(() => {
    Amplify.configure(awsConfig);
  }, []);

  return (
    <div className="marketplace">
      <Switch>
        <Route exact path={path} component={MarketplaceHome} />
        <Route path={`${path}/loras`} component={LoRAsPage} />
        <Route path={`${path}/datasets`} component={DatasetsPage} />
        <Route path={`${path}/workflows`} component={WorkflowsPage} />
      </Switch>
    </div>
  );
};

export default Marketplace;