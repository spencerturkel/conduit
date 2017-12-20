import {Action, Reducer} from 'redux';
import {Epic} from 'redux-observable';

export interface AsyncReducer {
    name: string;
    reducer: Reducer<any>;
}

export interface ContainerProps {
    addEpic: (epic: Epic<any, any, any>) => void;
    addReducer: (asyncReducer: AsyncReducer) => void;
    dispatch: (action: Action) => void;
}
