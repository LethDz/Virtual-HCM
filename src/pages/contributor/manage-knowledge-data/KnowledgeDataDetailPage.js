import React from 'react';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { KnowledgeDataDetail } from 'src/modules/contributor';

const KnowledgeDataDetailPage = (props) => (
  <LayoutWrapper>
    <KnowledgeDataDetail intent={props.match.params.intent}/>
  </LayoutWrapper>
);

export default KnowledgeDataDetailPage;
