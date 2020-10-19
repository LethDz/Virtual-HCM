export const handleInputChange = (event, component) => {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  component.setState({
    [name]: value,
  });
};
