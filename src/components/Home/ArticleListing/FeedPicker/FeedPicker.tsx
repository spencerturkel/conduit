import * as React from 'react';
import {StatelessComponent} from 'react';

interface LoggedInFeedPickerProps {
    activeFeed: 'user' | 'global';
    onGlobalFeedClicked: () => void;
    onUserFeedClicked: () => void;
    loggedIn: true;
}

interface LoggedOutFeedPickerProps {
    activeFeed: 'global';
    loggedIn: false;
}

export type FeedPickerProps = LoggedInFeedPickerProps | LoggedOutFeedPickerProps;

const FeedPicker = ((props: FeedPickerProps) => (
    <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
            <li className="nav-item">
                <a
                    className={`nav-link ${!props.loggedIn ? 'disabled' : props.activeFeed === 'user' ? 'active' : ''}`}
                    onClick={e => {
                        e.preventDefault();

                        if (props.loggedIn) {
                            props.onUserFeedClicked();
                        }
                    }}>
                    Your Feed
                </a>
            </li>
            <li className="nav-item">
                <a
                    className={`nav-link ${props.activeFeed === 'global' ? 'active' : ''}`}
                    onClick={e => {
                        e.preventDefault();

                        if (props.loggedIn) {
                            props.onGlobalFeedClicked();
                        }
                    }}>
                    Global Feed
                </a>
            </li>
        </ul>
    </div>
)) as StatelessComponent<FeedPickerProps>;

export default FeedPicker;
