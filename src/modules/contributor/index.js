import Contributor from 'src/modules/contributor/components/Contributor';

// Common modal
import SynonymsModal from 'src/modules/contributor/components/knowledgeDataComponent/modals/SynonymsModal';
import CreateReferenceModal from 'src/modules/contributor/components/reference/CreateReferenceModal';
import DocumentReferenceModal from 'src/modules/contributor/components/reference/DocumentReferenceModal';
import FormSectionTitle from 'src/modules/contributor/components/knowledgeDataComponent/FormSectionTitle';
import SynonymDetailModal from 'src/modules/contributor/components/synonym/SynonymDetailModal';
import CreateSynonymModal from 'src/modules/contributor/components/synonym/CreateSynonymModal';
import GenSynonymSentenceModal from 'src/modules/contributor/components/knowledgeDataComponent/modals/GenSynonymSentenceModal';
import ReferenceModal from 'src/modules/contributor/components/knowledgeDataComponent/modals/ReferenceModal';

// Form component
import CreateKnowledgeDataForm from 'src/modules/contributor/components/CreateKnowledgeDataForm';
import KnowledgeDataDetail from 'src/modules/contributor/components/KnowledgeDataDetail';
import Question from 'src/modules/contributor/components/knowledgeDataComponent/Question';
import MetaData from 'src/modules/contributor/components/knowledgeDataComponent/MetaData';
import Synonyms from 'src/modules/contributor/components/knowledgeDataComponent/Synonyms';
import CriticalDataItem from 'src/modules/contributor/components/knowledgeDataComponent/CriticalDataItem';
import RawData from 'src/modules/contributor/components/knowledgeDataComponent/RawData';
import BaseResponse from 'src/modules/contributor/components/knowledgeDataComponent/BaseResponse';
import Coresponse from 'src/modules/contributor/components/knowledgeDataComponent/Coresponse';
import CriticalData from 'src/modules/contributor/components/knowledgeDataComponent/CriticalData';

// List component
import ReferenceList from 'src/modules/contributor/components/reference/ReferenceList';
import KnowledgeDataList from 'src/modules/contributor/components/KnowledgeDataList';
import SynonymList from 'src/modules/contributor/components/synonym/SynonymList';

export * from 'src/modules/contributor/contributor.actions';
export * from 'src/modules/contributor/contributor.constants.js';
export * from 'src/modules/contributor/contributor.reducer.js';
export * from 'src/modules/contributor/contributor.selectors.js';

export {
  FormSectionTitle,
  GenSynonymSentenceModal,
  CreateKnowledgeDataForm,
  Synonyms,
  Question,
  CriticalDataItem,
  RawData,
  BaseResponse,
  Coresponse,
  CriticalData,
  Contributor,
  ReferenceList,
  KnowledgeDataDetail,
  CreateReferenceModal,
  DocumentReferenceModal,
  KnowledgeDataList,
  SynonymsModal,
  ReferenceModal,
  MetaData,
  SynonymList,
  SynonymDetailModal,
  CreateSynonymModal,
};
