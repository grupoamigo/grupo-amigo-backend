import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMembership, defaultValue } from 'app/shared/model/membership.model';

export const ACTION_TYPES = {
  FETCH_MEMBERSHIP_LIST: 'membership/FETCH_MEMBERSHIP_LIST',
  FETCH_MEMBERSHIP: 'membership/FETCH_MEMBERSHIP',
  CREATE_MEMBERSHIP: 'membership/CREATE_MEMBERSHIP',
  UPDATE_MEMBERSHIP: 'membership/UPDATE_MEMBERSHIP',
  DELETE_MEMBERSHIP: 'membership/DELETE_MEMBERSHIP',
  RESET: 'membership/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMembership>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MembershipState = Readonly<typeof initialState>;

// Reducer

export default (state: MembershipState = initialState, action): MembershipState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEMBERSHIP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEMBERSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEMBERSHIP):
    case REQUEST(ACTION_TYPES.UPDATE_MEMBERSHIP):
    case REQUEST(ACTION_TYPES.DELETE_MEMBERSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEMBERSHIP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEMBERSHIP):
    case FAILURE(ACTION_TYPES.CREATE_MEMBERSHIP):
    case FAILURE(ACTION_TYPES.UPDATE_MEMBERSHIP):
    case FAILURE(ACTION_TYPES.DELETE_MEMBERSHIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEMBERSHIP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEMBERSHIP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEMBERSHIP):
    case SUCCESS(ACTION_TYPES.UPDATE_MEMBERSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEMBERSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/memberships';

// Actions

export const getEntities: ICrudGetAllAction<IMembership> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEMBERSHIP_LIST,
  payload: axios.get<IMembership>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMembership> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEMBERSHIP,
    payload: axios.get<IMembership>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMembership> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEMBERSHIP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMembership> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEMBERSHIP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMembership> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEMBERSHIP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
