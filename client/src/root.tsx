import * as React from 'react';
import { Chunk } from './chunks-manager/chunks-manager';
import { BaseLayoutProps } from './layout/base-layout';
import { TrackNMonitor } from './track-n-monitor';
import { deleteFromList, mergeProps } from './utils/utils';

interface AppState {
  readonly chunks: ReadonlyArray<Chunk>;
  readonly roles: ReadonlyArray<Role>;
}

export type RoleKey = number;

export interface Role {
  readonly key: RoleKey;
  readonly label: string;
}

export type actionType = AddChunks | EditChunk | DeleteChunk;

interface AddChunks {
  type: 'add';
  chunks: ReadonlyArray<Chunk>;
}

interface EditChunk {
  type: 'edit';
  chunk: Chunk;
}

interface DeleteChunk {
  type: 'delete';
  chunkId: string;
}

interface AppContext {
  appState: AppState;
  appDispatch: React.Dispatch<actionType>;
}

export const AppContext = React.createContext<AppContext>({} as AppContext);

export const unassignedRole: Role = {
  key: -1,
  label: 'Unassigned'
};

const defaultAppstate: AppState ={
  chunks: [
    {
      start: 0,
      end: 1,
      role: unassignedRole.key,
      id: '000',
    },
  ],
  roles: [
    unassignedRole
  ]
};

const localStorageKey = 'appState';

const parseLocalAppState = (localAppStateRaw: string) => {
  let localAppState: AppState = {
    chunks: [],
    roles: []
  };
  try {
    localAppState = JSON.parse(localAppStateRaw);
  } catch (e) {
    localStorage.removeItem(localStorageKey);
    console.error('Local chunks corrupted', localAppStateRaw, e);
  }
  return localAppState;
};

const retrieveState = (): AppState => {
  const localAppRaw = localStorage.getItem(localStorageKey);
  const appState = localAppRaw ? parseLocalAppState(localAppRaw) : defaultAppstate;
  return appState;
};

const saveState = (state: AppState) => () => {
  const localChunksRaw = JSON.stringify(state.chunks);
  localStorage.setItem(localStorageKey, localChunksRaw);
  console.log('state saved');
};

const reducer = (state: AppState, action: actionType) => {
  switch (action.type) {
    case 'add':
      return { ...state, chunks: [...state.chunks, ...action.chunks] };
    case 'edit':
      return {
        ...state,
        chunks: state.chunks.map(chunk => (chunk.id === action.chunk.id ? action.chunk : chunk)),
      };
    case 'delete':
      return {
        ...state,
        chunks: deleteFromList<Chunk>(c => c.id === action.chunkId)(state.chunks),
      };
    default:
      return state;
  }
};

export const Root = props => {
  const { ...defaultHostProps } = props;
  const hostProps = mergeProps(BaseLayoutProps(), defaultHostProps);

  const [appState, appDispatch] = React.useReducer(reducer, undefined, retrieveState);
  const value = { appState, appDispatch };
  React.useEffect(() => {
    // hook before webapp killed?
    return saveState(appState);
  }, []);

  return (
    <div {...hostProps}>
      <AppContext.Provider value={value}>
        <TrackNMonitor />
      </AppContext.Provider>
    </div>
  );
};
