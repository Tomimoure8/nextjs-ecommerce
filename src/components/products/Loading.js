import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Loading({ className = "", width, height, circle }) {
    return (
        <Skeleton 
            className={className}
            width={width}
            height={height}
            circle={circle}
        />
    );
}

Loading.propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    circle: PropTypes.bool
};

Loading.defaultProps = {
    className: "",
    width: null,
    height: null,
    circle: false
};

export default Loading;
