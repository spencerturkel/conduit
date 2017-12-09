import * as React from 'react';

export interface LinkProps {
    activeClassName?: string;
    children?: React.ReactNode;
    className: string;
    to: string;
}

const Header = (Link: React.ComponentType<LinkProps>): React.StatelessComponent => () => (
    <nav className="navbar navbar-light">
        <div className="container">
            <Link className="navbar-brand" to="/">
                conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link activeClassName="active" className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link activeClassName="active" className="nav-link" to="/new-post">
                        <i className="ion-compose" />&nbsp;New Post
                    </Link>
                </li>
                <li className="nav-item">
                    <Link activeClassName="active" className="nav-link" to="/settings">
                        <i className="ion-gear-a" />&nbsp;Settings
                    </Link>
                </li>
                <li className="nav-item">
                    <Link activeClassName="active" className="nav-link" to="/sign-up">
                        Sign up
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default Header;
