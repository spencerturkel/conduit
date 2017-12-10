import * as React from 'react';
import {ComponentType, StatelessComponent} from 'react';

export interface ArticlePreview {
    author: {
        image: string;
        username: string;
    };
    createdAt: Date;
    description: string;
    favoritesCount: number;
    slug: string;
    title: string;
}

export interface ArticleListingProps {
    previews: ArticlePreview[];
}

const ArticleListing = (FeedPicker: ComponentType): StatelessComponent<ArticleListingProps> => ({previews}) => (
    <>
        <FeedPicker />

        {previews.map(preview => (
            <div key={preview.slug} className="article-preview">
                <div className="article-meta">
                    <a href={'/profile/' + preview.author.username}>
                        <img src={preview.author.image} />
                    </a>
                    <div className="info">
                        <a href={'/profile/' + preview.author.username} className="author">
                            {preview.author.username}
                        </a>
                        <span className="date">{preview.createdAt.toDateString()}</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                        <i className="ion-heart" /> {preview.favoritesCount}
                    </button>
                </div>
                <a href={'/article/' + preview.slug} className="preview-link">
                    <h1>{preview.title}</h1>
                    <p>{preview.description}</p>
                    <span>Read more...</span>
                </a>
            </div>
        ))}
    </>
);

export default ArticleListing;
