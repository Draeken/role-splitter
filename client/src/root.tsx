import * as React from 'react';
import { Chunk } from './chunks-manager/chunks-manager';
import { BaseLayoutProps } from './layout/base-layout';
import { TrackNMonitor } from './track-n-monitor';
import { deleteFromList, idGeneratorFn, mergeProps } from './utils/utils';

interface AppState {
  readonly chunks: ReadonlyArray<Chunk>;
  readonly roles: ReadonlyArray<Role>;
}

export type RoleKey = number | string;

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
  label: 'Unassigned',
};

const defaultAppstate: AppState = {
  chunks: [
    {
      start: 0,
      end: 1,
      role: unassignedRole.key,
      id: '000',
    },
  ],
  roles: [unassignedRole],
};

const localStorageKey = 'appState';

const parseLocalAppState = (localAppStateRaw: string) => {
  let localAppState: AppState = {
    chunks: [],
    roles: [],
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

const roleIdGen = idGeneratorFn('role');

const checkForNewRoles = (
  chunks: ReadonlyArray<Chunk>,
  roles: ReadonlyArray<Role>
): [Role[], Chunk[]] => {
  const chunksWithRoleKey: Chunk[] = [];
  return [
    chunks.reduce((acc: Role[], chunk) => {
      // Issue if user add a new role === to an existing key
      if (roles.some(role => role.key === chunk.role)) {
        chunksWithRoleKey.push(chunk);
        return acc;
      }
      const roleKey = roleIdGen.next().value;
      chunksWithRoleKey.push({ ...chunk, role: roleKey });
      return [...acc, { label: '' + chunk.role, key: roleKey }];
    }, []),
    chunksWithRoleKey,
  ];
};

const handleAddChunks = (state: AppState, action: AddChunks): AppState => {
  const [newRoles, chunks] = checkForNewRoles(action.chunks, state.roles);
  return {
    ...state,
    chunks: [...state.chunks, ...chunks],
    roles: [...state.roles, ...newRoles],
  };
};

const handleEditChunk = (state: AppState, action: EditChunk): AppState => {
  const [newRoles, chunks] = checkForNewRoles([action.chunk], state.roles);
  const targetChunk = chunks[0];
  return {
    ...state,
    chunks: state.chunks.map(chunk => (chunk.id === targetChunk.id ? targetChunk : chunk)),
    roles: [...state.roles, ...newRoles],
  };
};
/**
   *
const handleRemoveChunk = (state: AppState, action: EditChunk): AppState => {
  create a counter on role usage? Avoid scanning whole chunk base
  const remainingRoles =
   {
        ...state,
        chunks: deleteFromList<Chunk>(c => c.id === action.chunkId)(state.chunks),
      };

}*/

const reducer = (state: AppState, action: actionType) => {
  switch (action.type) {
    case 'add':
      return handleAddChunks(state, action);
    case 'edit':
      return handleEditChunk(state, action);
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
