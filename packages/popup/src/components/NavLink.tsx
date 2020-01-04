import React, { useCallback } from 'react';
import { Link } from '@reach/router';

export const NavLink = (props: any): React.ReactElement => {
    const onClick = useCallback(() => {
        localStorage.setItem('path', props.to);
    }, [props.to]);
    const getProps = useCallback(({ isCurrent }) => ({ className: isCurrent ? 'nav-link active' : 'nav-link' }), []);

    return <Link onClick={onClick} {...props} getProps={getProps} />;
};
