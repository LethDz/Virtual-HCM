import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { ConfigureSystem } from 'src/modules/admin';

const ConfigureSystemHook = () => {
  const { addToast } = useToasts();
  return <ConfigureSystem addToast={addToast} />;
};

export default ConfigureSystemHook;
