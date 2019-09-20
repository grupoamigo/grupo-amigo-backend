import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserMembership from './user-membership';
import UserMembershipDetail from './user-membership-detail';
import UserMembershipUpdate from './user-membership-update';
import UserMembershipDeleteDialog from './user-membership-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserMembershipUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserMembershipUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserMembershipDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserMembership} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserMembershipDeleteDialog} />
  </>
);

export default Routes;
