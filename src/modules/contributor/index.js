import Contributor from "src/modules/contributor/components/Contributor";
import CreateDataApprovalForm from "src/modules/contributor/components/CreateDataApprovalForm";

import Intent from "src/modules/contributor/components/dataApprovalComponent/Intent";
import Question from "src/modules/contributor/components/dataApprovalComponent/Question";
import GenList from "src/modules/contributor/components/dataApprovalComponent/GenList";
import GenSynonyms from "src/modules/contributor/components/dataApprovalComponent/GenSynonyms";
import SynonymsModal from "src/modules/contributor/components/dataApprovalComponent/SynonymsModal";

export * from "src/modules/admin/admin.actions";
export * from "src/modules/admin/admin.constants.js";
export * from "src/modules/admin/admin.reducer.js";
export * from "src/modules/admin/admin.selectors.js";

export {
  Contributor,
  CreateDataApprovalForm,
  Intent,
  Question,
  GenList,
  GenSynonyms,
  SynonymsModal,
};
