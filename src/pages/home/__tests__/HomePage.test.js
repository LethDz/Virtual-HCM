import { render } from '@testing-library/react';
import { HomePage } from 'src/pages';

it('renders home page', () => {
  const { container } = render(HomePage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
