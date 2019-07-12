import * as React from 'react';
import { Chunk, ChunkManager } from './chunks-manager/chunks-manager';
import { BaseLayoutProps } from './layout/base-layout';
import { mergeProps } from './utils/utils';

interface AppState {
  chunks: ReadonlyArray<Chunk>;
}

type actionType = AddChunk | EditChunk;

interface AddChunk {
  type: 'add';
  payload: Chunk;
}

interface EditChunk {
  type: 'edit';
  payload: Chunk;
}

interface AppContext {
  appState: AppState;
  appDispatch: React.Dispatch<actionType>;
}

export const AppContext = React.createContext<AppContext>({} as AppContext);

const defaultChunks: ReadonlyArray<Chunk> = [
  {
    start: 0,
    end: 1,
    role: 'Unassigned',
    id: '000',
  },
];

const localStorageKey = 'chunks';

const parseLocalChunks = (localChunksRaw: string) => {
  let localChunks = [];
  try {
    localChunks = JSON.parse(localChunksRaw || '[]');
  } catch (e) {
    localStorage.removeItem(localStorageKey);
    console.error('Local chunks corrupted', localChunksRaw, e);
  }
  return localChunks;
};

const retrieveState = (): AppState => {
  const localChunksRaw = localStorage.getItem(localStorageKey);
  const chunks = localChunksRaw ? parseLocalChunks(localChunksRaw) : defaultChunks;
  return {
    chunks,
  };
};

const reducer = (state: AppState, action: actionType) => {
  switch (action.type) {
    case 'add':
      return { ...state, chunks: [...state.chunks, action.payload] };
    case 'edit':
      return {
        ...state,
        chunks: state.chunks.map(chunk =>
          chunk.id === action.payload.id ? action.payload : chunk
        ),
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

  return (
    <div {...hostProps}>
      <AppContext.Provider value={value}>
        <ChunkManager />
      </AppContext.Provider>
    </div>
  );
};
