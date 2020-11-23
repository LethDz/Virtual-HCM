import { render } from '@testing-library/react';
import { KnowledgeDataCreateFormPage } from 'src/pages';

it('renders knowledge data create form page', () => {
  const { container } = render(KnowledgeDataCreateFormPage());
  expect(container).toMatchInlineSnapshot(`<div />`);
});
