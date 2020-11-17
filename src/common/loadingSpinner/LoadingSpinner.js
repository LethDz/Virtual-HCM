import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { Spinner } from 'reactstrap';

const styleModal = {
  wrapper: {
    position: 'unset',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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

const style = {
  wrapper: {
    position: 'unset',
  },
  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
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
  switch (props.type) {
    case 'MODAL':
      return (
        <LoadingOverlay
          active={props.loading}
          spinner={<Spinner color="primary" />}
          text={<p>{props.text}</p>}
          styles={styleModal}
        >
          {props.children}
        </LoadingOverlay>
      );
    default:
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
  }
};

export default LoadingSpinner;
