import { render } from '@testing-library/react';
import { ContributorEditPage } from 'src/pages';

it('renders contributor edit page', () => {
  const { container } = render(ContributorEditPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
