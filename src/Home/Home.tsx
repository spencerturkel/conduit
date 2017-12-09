import * as React from 'react';
import {ComponentType, StatelessComponent} from 'react';

const Home = (PopularTags: ComponentType, ArticleListing: ComponentType): StatelessComponent => {
    const sfc: StatelessComponent = () => (
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
                        <ArticleListing />
                    </div>

                    <div className="col-md-3">
                        <PopularTags />
                    </div>
                </div>
            </div>
        </div>
    );

    sfc.displayName =
        'Home(' +
        (PopularTags.displayName || PopularTags.name) +
        ', ' +
        (ArticleListing.displayName || ArticleListing.name) +
        ')';

    return sfc;
};

export default Home;
