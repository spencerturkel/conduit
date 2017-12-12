import {Observable} from 'rxjs/Observable';
import {first, map, switchMap} from 'rxjs/operators';

export enum ActionType {
    FETCH_ALL = '[conduit][tags] Fetch All',
    FETCH_ALL_ERROR = '[conduit][tags] Fetch All Error',
    LOAD_ALL = '[conduit][tags] Load All',
}

export interface FetchAllAction {
    type: ActionType.FETCH_ALL;
}

export interface FetchAllErrorAction {
    error: any;
    type: ActionType.FETCH_ALL_ERROR;
}

export interface LoadAllAction {
    tags: string[];
    type: ActionType.LOAD_ALL;
}

export type Action = FetchAllAction | FetchAllErrorAction | LoadAllAction;

export const fetchAll = (): FetchAllAction => ({type: ActionType.FETCH_ALL});
export const fetchAllError = (error: any): FetchAllErrorAction => ({error, type: ActionType.FETCH_ALL_ERROR});
export const loadAll = (tags: string[]): LoadAllAction => ({tags, type: ActionType.LOAD_ALL});

export interface State {
    error?: any;
    loading: boolean;
    tags: string[];
}

export const initialState: State = {
    loading: false,
    tags: [],
};

export const reducer = (state: State | undefined = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.FETCH_ALL:
            return {...state, error: undefined, loading: true};
        case ActionType.FETCH_ALL_ERROR:
            return {...state, error: action.error, loading: false};
        case ActionType.LOAD_ALL:
            return {error: undefined, loading: false, tags: action.tags};
        default:
            return state;
    }
};

export const fetchAll$ = (tags$: () => Observable<string[]>) => (actions$: Observable<Action>): Observable<Action> =>
    actions$.pipe(first(({type}) => type === ActionType.FETCH_ALL), switchMap(() => tags$()), map(loadAll));

export const selectError = (state: State) => state.error;
export const selectLoading = (state: State) => state.loading;
export const selectTags = (state: State) => state.tags;
