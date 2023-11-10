import { Collapse } from './Collapse.tsx';
import { InlineLatex } from './InlineLatex.tsx';
import Tippy from '@tippyjs/react';

interface Proof {
  content?: Proof[];

  collapse?: {
    content: Proof;
    placeholder?: Proof;
  };
  latex?: string;
  indent?: Proof;
  popup?: {
    content: Proof;
    ["popup-content"]: Proof;
  };
}

interface InlineProofProps {
  proof: Proof;
}

export const InlineProof: React.FC<InlineProofProps> = (props) => {
  const { proof } = props;

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
        placeholder={placeHolderContent  && <InlineProof proof={placeHolderContent} />}
      />
    );
  }

  if ('latex' in proof && typeof proof['latex'] === 'string') {
    return <InlineLatex latex={proof['latex']} />;
  }
  if (
    'indent' in proof &&
    proof['indent'] &&
    typeof proof['indent'] === 'object'
  ) {
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
