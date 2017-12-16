import {Observable} from 'rxjs/Observable';
import {ajax} from 'rxjs/observable/dom/ajax';
import {map} from 'rxjs/operators';

export const tags$: Observable<string[]> = ajax({
    url: 'https://conduit.productionready.io/api/tags',
    async: true,
    method: 'GET',
    responseType: 'json',
}).pipe(map(({response: {tags}}) => tags));
