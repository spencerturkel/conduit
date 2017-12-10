import {fetchAllError, fetchAll, loadAll, initialState, reducer, Action, State} from './tags';

const testStates = (transform: (initial: State | undefined) => any) => {
    expect(transform(undefined)).toMatchSnapshot();

    expect(transform({loading: true, tags: []})).toMatchSnapshot();

    expect(transform({loading: true, tags: ['hello', 'world']})).toMatchSnapshot();

    expect(transform({loading: false, tags: ['hello', 'world']})).toMatchSnapshot();

    expect(transform({error: 'some error', loading: false, tags: ['hello', 'world']})).toMatchSnapshot();
};

describe('reducer', () => {
    it('should return initial state given an unknown action and an undefined state', () => {
        const state = reducer(undefined, {type: Math.random().toString()} as Action);

        expect(state).toBe(initialState);
    });

    describe('action creators', () => {
        const actionYieldsExpectedState = (name: string, action: Action) =>
            it(`should match snapshot for ${name}()`, () => testStates(state => reducer(state, action)));

        actionYieldsExpectedState('fetchAll', fetchAll());
        actionYieldsExpectedState('fetchAllError', fetchAllError('test error'));
        actionYieldsExpectedState('loadAll', loadAll(['tag one', 'tag two', 'tag three']));
    });
});
