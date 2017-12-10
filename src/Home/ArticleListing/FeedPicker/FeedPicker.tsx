import * as React from 'react';
import {StatelessComponent} from 'react';

const FeedPicker = (() => (
    <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
            <li className="nav-item">
                <a className="nav-link disabled" href="">
                    Your Feed
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" href="">
                    Global Feed
                </a>
            </li>
        </ul>
    </div>
)) as StatelessComponent;

export default FeedPicker;
