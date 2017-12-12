import * as _tags from './tags';
import {createSelector} from 'reselect';

export interface State {
    tags: _tags.State;
}

export const reducers = {
    tags: _tags.reducer,
};

const selectTags = (state: State): _tags.State => state.tags;

export const tags = {
    fetchAll: _tags.fetchAll,
    fetchAllError: _tags.fetchAllError,
    loadAll: _tags.loadAll,
    fetchAll$: _tags.fetchAll$,
    selectError: createSelector(selectTags, _tags.selectError),
    selectLoading: createSelector(selectTags, _tags.selectLoading),
    selectTags: createSelector(selectTags, _tags.selectTags),
};
