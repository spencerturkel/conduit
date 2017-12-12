import * as React from 'react';
import {StatelessComponent} from 'react';

import setDisplayName from '../../set-display-name';

export interface PopularTagsProps {
    onTagClicked: (tag: string) => void;
    tags: string[];
}

const PopularTags = (): StatelessComponent<PopularTagsProps> => {
    const sfc = ({onTagClicked, tags}: PopularTagsProps) => (
        <div className="sidebar">
            <p>Popular Tags</p>

            <div className="tag-list">
                {tags.map(name => (
                    <button
                        type="button"
                        key={name}
                        onClick={() => onTagClicked(name)}
                        className="tag-pill tag-default">
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );

    setDisplayName(sfc, PopularTags);

    return sfc;
};

export default PopularTags;
