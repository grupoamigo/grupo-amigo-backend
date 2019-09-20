import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILoad, defaultValue } from 'app/shared/model/load.model';

export const ACTION_TYPES = {
  FETCH_LOAD_LIST: 'load/FETCH_LOAD_LIST',
  FETCH_LOAD: 'load/FETCH_LOAD',
  CREATE_LOAD: 'load/CREATE_LOAD',
  UPDATE_LOAD: 'load/UPDATE_LOAD',
  DELETE_LOAD: 'load/DELETE_LOAD',
  RESET: 'load/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILoad>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type LoadState = Readonly<typeof initialState>;

// Reducer

export default (state: LoadState = initialState, action): LoadState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOAD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOAD):
    case REQUEST(ACTION_TYPES.UPDATE_LOAD):
    case REQUEST(ACTION_TYPES.DELETE_LOAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOAD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOAD):
    case FAILURE(ACTION_TYPES.CREATE_LOAD):
    case FAILURE(ACTION_TYPES.UPDATE_LOAD):
    case FAILURE(ACTION_TYPES.DELETE_LOAD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOAD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOAD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOAD):
    case SUCCESS(ACTION_TYPES.UPDATE_LOAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOAD):
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

const apiUrl = 'api/loads';

// Actions

export const getEntities: ICrudGetAllAction<ILoad> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LOAD_LIST,
  payload: axios.get<ILoad>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ILoad> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOAD,
    payload: axios.get<ILoad>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILoad> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOAD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILoad> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOAD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILoad> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOAD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
