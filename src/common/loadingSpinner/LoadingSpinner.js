import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Spinner } from 'reactstrap';

const style = {
  wrapper: {
    position: 'unset',
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0px',
    left: '0px',
    display: 'flex',
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#007bff',
    background: 'rgba(254,254,254,0.7)',
    zIndex: '800',
    transition: 'opacity 500ms ease-in',
    opacity: 1,
  },
  content: {
    margin: 'auto',
  },
};

const LoadingSpinner = (props) => {
  return (
    <LoadingOverlay
      active={props.loading}
      spinner={<Spinner color="primary" />}
      text={<p>{props.text}</p>}
      styles={style}
    >
      {props.children}
    </LoadingOverlay>
  );
};

export default LoadingSpinner;
