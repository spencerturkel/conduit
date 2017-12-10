import * as React from 'react';
import {ComponentType, StatelessComponent} from 'react';

import {LinkProps} from '../../link-props';
import setDisplayName from '../../set-display-name';

export interface PopularTagsProps {
    tags: Array<{name: string; link: string}>;
}

const PopularTags = (Link: ComponentType<LinkProps>): StatelessComponent<PopularTagsProps> => {
    const sfc = ({tags}: PopularTagsProps) => (
        <div className="sidebar">
            <p>Popular Tags</p>

            <div className="tag-list">
                {tags.map(({name, link}) => (
                    <Link to={link} key={name} className="tag-pill tag-default">
                        {name}
                    </Link>
                ))}
            </div>
        </div>
    );

    setDisplayName(sfc, PopularTags, Link);

    return sfc;
};

export default PopularTags;
