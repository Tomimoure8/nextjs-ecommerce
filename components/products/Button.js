import PropTypes from 'prop-types';

function Button({ onClick, className, children }) {
    return (
        <button
            className={`py-3.5 px-6 md:py-5 md:px-10 bg-secondary text-white font-bold text-base md:text-xl rounded-sm cursor-pointer shadow-md hover:opacity-50 focus:shadow-2xl border-none outline-none ${className}`}
            onClick={onClick || null}
            aria-label={children}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    onClick: null,
    className: '',
};

export default Button;
