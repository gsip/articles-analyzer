import React from 'react';
import { Link } from '@reach/router';

export const NavLink = (props: any): React.ReactElement => (
    <Link
        onClick={() => {
            localStorage.setItem('path', props.to);
        }}
        {...props}
        getProps={({ isCurrent }) => {
            return {
                className: isCurrent ? 'nav-link active' : 'nav-link',
            };
        }}
    />
);
