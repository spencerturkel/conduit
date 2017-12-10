import * as React from 'react';
import {ComponentType, StatelessComponent} from 'react';

import setDisplayName from '../set-display-name';
import {ArticleListingProps} from './ArticleListing';

const Home = (
    PopularTags: ComponentType,
    ArticleListing: ComponentType<ArticleListingProps>,
): StatelessComponent<ArticleListingProps> => {
    const sfc: StatelessComponent<ArticleListingProps> = ({previews}) => (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <ArticleListing previews={previews} />
                    </div>

                    <div className="col-md-3">
                        <PopularTags />
                    </div>
                </div>
            </div>
        </div>
    );

    setDisplayName(sfc, Home, PopularTags, ArticleListing);

    return sfc;
};

export default Home;
