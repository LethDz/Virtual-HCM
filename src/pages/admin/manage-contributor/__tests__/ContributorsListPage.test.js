import { render } from '@testing-library/react';
import { ContributorsListPage } from 'src/pages';

it('renders contributors list page', () => {
  const { container } = render(ContributorsListPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
