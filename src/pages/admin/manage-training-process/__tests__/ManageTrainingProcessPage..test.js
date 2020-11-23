import { render } from '@testing-library/react';
import { ManageTrainingProcessPage } from 'src/pages';

it('renders manage training process page', () => {
  const { container } = render(ManageTrainingProcessPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
