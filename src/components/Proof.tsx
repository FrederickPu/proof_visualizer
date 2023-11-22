import { Collapse } from './Collapse.tsx';
import { InlineLatex } from './InlineLatex.tsx';
import Tippy from '@tippyjs/react';
import './styles.modules.css'
// import '../App.css'

interface Proof {
  content?: (Proof | string)[];

  collapse?: {
    content: Proof | string;
    placeholder?: string;
  };
  indent?: Proof | string;
  popup?: {
    content: Proof | string;
    ["popup-content"]: Proof | string;
  };
}

interface InlineProofProps {
  proof: Proof | string;
}

export const InlineProof: React.FC<InlineProofProps> = (props) => {
  const { proof } = props;

  if (typeof proof === "string")
    return <InlineLatex latex={proof}/>

  if ('content' in proof && Array.isArray(proof['content'])) {
    const contentArray = proof['content'];

    return (
      <span>
        {contentArray.map((x, index) => (
          <span key={index}>
            <InlineProof proof={x} />
            {index < contentArray.length - 1 && ' '}
          </span>
        ))}
      </span>
    );
  }

  const collapseContent = proof['collapse']?.['content'];
  const placeHolderContent = proof['collapse']?.['placeholder'];
  if (collapseContent) {
    return (
      <Collapse
        content={<InlineProof proof={collapseContent} />}
        // placeholder={placeHolderContent  && <InlineLatex latex={placeHolderContent} />}
      />
    );
  }

  if ('indent' in proof && proof['indent']) {
    console.log("indnet")
    return (
      <div className="explanation_indent">
        <InlineProof proof={proof['indent']} />
      </div>
    );
  }

  const popupContent = proof['popup']?.['popup-content'];
  const content = proof['popup']?.['content'];
  if (popupContent && content) {
    return (
      <Tippy content={<InlineProof proof={popupContent} />}>
        <a href="#">
          <InlineProof proof={content} />
        </a>
      </Tippy>
    );
  }
};
