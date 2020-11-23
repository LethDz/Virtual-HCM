import { render } from '@testing-library/react';
import { TrainDataPage } from 'src/pages';

it('renders train data page', () => {
  const { container } = render(TrainDataPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
