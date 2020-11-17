export const handleInputChange = (event, component) => {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  component.setState({
    [name]: value,
  });
};

export const handleInputFormChange = (event, component) => {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  component.setState({
    form: {
      ...component.state.form,
      [name]: value,
    },
  });
};

export const handleInputHook = (event, setState) => {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  setState(value);
};

export const handleItemInWordsChange = (event, component) => {
  const items = component.state.words;
  const index = event.target.name;
  const value = event.target.value;
  items[index] = value;
  component.setState({
    words: items,
  });
};
