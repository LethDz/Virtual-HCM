import { render } from '@testing-library/react';
import { KnowledgeDataDetailPage } from 'src/pages';

it('renders knowledge data detail page', () => {
  const { container } = render(KnowledgeDataDetailPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
