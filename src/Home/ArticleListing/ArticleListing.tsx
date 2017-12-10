import * as React from 'react';
import {ComponentType, StatelessComponent} from 'react';

import {LinkProps} from '../../link-props';
import setDisplayName from '../../set-display-name';

export interface ArticlePreview {
    author: {
        image: string;
        username: string;
    };
    createdAt: Date;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    title: string;
}

export interface ArticleListingProps {
    previews: ArticlePreview[];
    onFavoriteCountClick: (slug: string) => void;
}

const ArticleListing = (
    FeedPicker: ComponentType,
    Link: ComponentType<LinkProps>,
): StatelessComponent<ArticleListingProps> => {
    const sfc: StatelessComponent<ArticleListingProps> = ({onFavoriteCountClick, previews}) => (
        <>
            <FeedPicker />

            {previews.map(preview => (
                <div key={preview.slug} className="article-preview">
                    <div className="article-meta">
                        <Link to={'/profile/' + preview.author.username}>
                            <img src={preview.author.image} />
                        </Link>
                        <div className="info">
                            <Link to={'/profile/' + preview.author.username} className="author">
                                {preview.author.username}
                            </Link>
                            <span className="date">{preview.createdAt.toDateString()}</span>
                        </div>
                        <button
                            className={`btn btn-${preview.favorited ? '' : 'outline-'}primary btn-sm pull-xs-right`}
                            onClick={e => {
                                e.preventDefault();
                                onFavoriteCountClick(preview.slug);
                            }}>
                            <i className="ion-heart" /> {preview.favoritesCount}
                        </button>
                    </div>
                    <Link to={'/article/' + preview.slug} className="preview-link">
                        <h1>{preview.title}</h1>
                        <p>{preview.description}</p>
                        <span>Read more...</span>
                    </Link>
                </div>
            ))}
        </>
    );

    setDisplayName(sfc, ArticleListing, FeedPicker);

    return sfc;
};

export default ArticleListing;
