import {Observable} from 'rxjs/Observable';
import {timer} from 'rxjs/observable/timer';
import {first, mapTo} from 'rxjs/operators';
import {TestScheduler} from 'rxjs/Rx';

import {tags$ as tags$Factory} from './tags';

describe('tags$', () => {
    it('should return tags from response', () => {
        const tags = ['hello', 'world'];
        const testScheduler = new TestScheduler((actual, expected) => expected(actual).toEqual(expected));

        const ajax = jest.fn<Observable<{response: {tags: string[]}}>>(url =>
            timer(testScheduler.createTime('--|'), testScheduler).pipe(first(), mapTo({response: {tags}})),
        );

        const tags$ = tags$Factory(ajax);

        testScheduler.expectObservable(tags$).toBe('--r', {r: tags});
    });
});
