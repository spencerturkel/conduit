import * as React from 'react';
import {ComponentType, StatelessComponent} from 'react';

const ArticleListing = (FeedPicker: ComponentType): StatelessComponent =>
    (() => (
        <>
            <FeedPicker />

            <div className="article-preview">
                <div className="article-meta">
                    <a href="/profile">
                        <img src="http://i.imgur.com/Qr71crq.jpg" />
                    </a>
                    <div className="info">
                        <a href="" className="author">
                            Eric Simons
                        </a>
                        <span className="date">January 20th</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                        <i className="ion-heart" /> 29
                    </button>
                </div>
                <a href="" className="preview-link">
                    <h1>How to build webapps that scale</h1>
                    <p>This is the description for the post.</p>
                    <span>Read more...</span>
                </a>
            </div>

            <div className="article-preview">
                <div className="article-meta">
                    <a href="/profile">
                        <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                    </a>
                    <div className="info">
                        <a href="" className="author">
                            Albert Pai
                        </a>
                        <span className="date">January 20th</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                        <i className="ion-heart" /> 32
                    </button>
                </div>
                <a href="" className="preview-link">
                    <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                    <p>This is the description for the post.</p>
                    <span>Read more...</span>
                </a>
            </div>
        </>
    )) as StatelessComponent;

export default ArticleListing;
