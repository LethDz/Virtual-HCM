import { render } from '@testing-library/react';
import { LoginPage } from 'src/pages';

it('renders login page', () => {
  const { container } = render(LoginPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
