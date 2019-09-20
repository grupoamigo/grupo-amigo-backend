import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUserMembership, defaultValue } from 'app/shared/model/user-membership.model';

export const ACTION_TYPES = {
  FETCH_USERMEMBERSHIP_LIST: 'userMembership/FETCH_USERMEMBERSHIP_LIST',
  FETCH_USERMEMBERSHIP: 'userMembership/FETCH_USERMEMBERSHIP',
  CREATE_USERMEMBERSHIP: 'userMembership/CREATE_USERMEMBERSHIP',
  UPDATE_USERMEMBERSHIP: 'userMembership/UPDATE_USERMEMBERSHIP',
  DELETE_USERMEMBERSHIP: 'userMembership/DELETE_USERMEMBERSHIP',
  RESET: 'userMembership/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUserMembership>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type UserMembershipState = Readonly<typeof initialState>;

// Reducer

export default (state: UserMembershipState = initialState, action): UserMembershipState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERMEMBERSHIP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USERMEMBERSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USERMEMBERSHIP):
    case REQUEST(ACTION_TYPES.UPDATE_USERMEMBERSHIP):
    case REQUEST(ACTION_TYPES.DELETE_USERMEMBERSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERMEMBERSHIP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USERMEMBERSHIP):
    case FAILURE(ACTION_TYPES.CREATE_USERMEMBERSHIP):
    case FAILURE(ACTION_TYPES.UPDATE_USERMEMBERSHIP):
    case FAILURE(ACTION_TYPES.DELETE_USERMEMBERSHIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERMEMBERSHIP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERMEMBERSHIP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USERMEMBERSHIP):
    case SUCCESS(ACTION_TYPES.UPDATE_USERMEMBERSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USERMEMBERSHIP):
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

const apiUrl = 'api/user-memberships';

// Actions

export const getEntities: ICrudGetAllAction<IUserMembership> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERMEMBERSHIP_LIST,
  payload: axios.get<IUserMembership>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IUserMembership> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USERMEMBERSHIP,
    payload: axios.get<IUserMembership>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IUserMembership> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USERMEMBERSHIP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUserMembership> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USERMEMBERSHIP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUserMembership> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USERMEMBERSHIP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
