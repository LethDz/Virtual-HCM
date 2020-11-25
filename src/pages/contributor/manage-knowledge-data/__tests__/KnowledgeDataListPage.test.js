import { render } from '@testing-library/react';
import { KnowledgeDataListPage } from 'src/pages';

it('renders knowledge data list page', () => {
  const { container } = render(KnowledgeDataListPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
