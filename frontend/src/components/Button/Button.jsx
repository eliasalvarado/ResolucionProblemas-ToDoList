import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({
    text,
    onClick,
    name,
}) {
  return (
    <button
      className={`${styles.button}`}
      onClick={onClick}
      name={name}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
};

Button.defaultProps = {
  onClick: null,
};

export default Button;
