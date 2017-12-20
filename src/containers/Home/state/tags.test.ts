import {TestScheduler} from 'rxjs/testing/TestScheduler';

import {fetchAllError, fetchAll, fetchAll$, loadAll, initialState, reducer, Action, State} from './tags';

const testStates = (transform: (initial: State | undefined) => any) => {
    expect(transform(undefined)).toMatchSnapshot();

    expect(transform({loading: true, tags: []})).toMatchSnapshot();

    expect(transform({loading: true, tags: ['hello', 'world']})).toMatchSnapshot();

    expect(transform({loading: false, tags: ['hello', 'world']})).toMatchSnapshot();

    expect(transform({error: 'some error', loading: false, tags: ['hello', 'world']})).toMatchSnapshot();
};

describe('reducers', () => {
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

describe('epics', () => {
    let scheduler: TestScheduler;

    beforeEach(() => {
        scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
    });

    describe(fetchAll$.name, () => {
        it('should emit LOAD_ALL actions after the first FETCH_ALL action', () => {
            const tags$ = scheduler.createColdObservable<string[]>('--a--b|', {a: [], b: ['hello', 'world']});

            const sut = fetchAll$(tags$);

            const actions$ = scheduler.createColdObservable<Action>('-a--b', {a: {type: 'unknown'}, b: fetchAll()});

            scheduler
                .expectObservable(sut(actions$))
                .toBe('------a--b', {a: loadAll([]), b: loadAll(['hello', 'world'])});
        });

        it('should catch and report errors in the tag source without completing', () => {
            const tags$ = scheduler.createColdObservable<string[]>('#', undefined, 'err');

            const sut = fetchAll$(tags$);

            const actions$ = scheduler.createColdObservable<Action>('ab', {a: fetchAll(), b: fetchAll()});

            scheduler.expectObservable(sut(actions$)).toBe('aa', {a: fetchAllError('err')});
        });
    });
});
