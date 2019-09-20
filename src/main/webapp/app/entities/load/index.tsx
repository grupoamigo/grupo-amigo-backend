import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Load from './load';
import LoadDetail from './load-detail';
import LoadUpdate from './load-update';
import LoadDeleteDialog from './load-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LoadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LoadUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LoadDetail} />
      <ErrorBoundaryRoute path={match.url} component={Load} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LoadDeleteDialog} />
  </>
);

export default Routes;
