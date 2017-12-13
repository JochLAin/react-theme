'use strict';

import PropTypes from 'prop-types';

export const transition = PropTypes.shape({
    timeout: PropTypes.shape({
        appear: PropTypes.number,
        enter: PropTypes.number,
        leave: PropTypes.number,
    })
})