import {timer} from 'rxjs/observable/timer';
import {first, mapTo} from 'rxjs/operators';
import {TestScheduler} from 'rxjs/Rx';

import {tags$ as tags$Factory} from './tags';
import {never} from 'rxjs/observable/never';

describe('tags$', () => {
    it('should query https://conduit.productionready.io/api/tags', () => {
        tags$Factory(url => {
            expect(url).toBe('https://conduit.productionready.io/api/tags');
            return never();
        });
    });

    it('should return tags from response', () => {
        const tags = ['hello', 'world'];
        const testScheduler = new TestScheduler((actual, expected) => expected(actual).toEqual(expected));

        const tags$ = tags$Factory(() =>
            timer(testScheduler.createTime('--|'), testScheduler).pipe(first(), mapTo({response: {tags}})),
        );

        testScheduler.expectObservable(tags$).toBe('--r', {r: tags});
    });
});
