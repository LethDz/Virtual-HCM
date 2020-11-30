import { render } from '@testing-library/react';
import { UserDetailPage } from 'src/pages';

it('renders user detail page', () => {
  const { container } = render(UserDetailPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
