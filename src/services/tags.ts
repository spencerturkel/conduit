import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

export const tags$ = (ajax: (url: string) => Observable<{response: {tags: string[]}}>): Observable<string[]> =>
    ajax('https://conduit.productionready.io/api/tags').pipe(map(({response: {tags}}) => tags));
