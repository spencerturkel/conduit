import * as React from 'react';
import {StatelessComponent} from 'react';

export interface PopularTagsProps {
    tags: Array<{name: string; link: string}>;
}

const PopularTags: StatelessComponent<PopularTagsProps> = ({tags}: PopularTagsProps) => (
    <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
            {tags.map(({name, link}) => (
                <a href={link} className="tag-pill tag-default">
                    {name}
                </a>
            ))}
        </div>
    </div>
);

export default PopularTags;
