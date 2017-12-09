import * as React from 'react';

export interface NavLinkProps {
    activeClassName?: string;
    children?: React.ReactNode;
    className: string;
    to: string;
}
