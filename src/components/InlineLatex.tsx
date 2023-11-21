// allows for use of $ notation for declaring inline latex. 
// eg: "The solutions to the equation $x^2 + y^2 = 1$ are the points on the circle"
// import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export type ParsedLatex = { text: string } | { tex: string };

function parseTex(inputString : string) : ParsedLatex[]{
    const regex = /\$(.*?)\$/g;
    const parts = inputString.split(regex);
    const parsedArray = [];
  
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        parsedArray.push({ text: parts[i] });
      } else {
        parsedArray.push({ tex: parts[i] });
      }
    }
  
    return parsedArray;
}

export interface InlineLatexProps {
  latex : string
}
export function InlineLatex(props : InlineLatexProps){
  const {latex} = props;
  const parsed = parseTex(latex);
  return <span className='Latex'>
    {
    parsed.map((elem: ParsedLatex, index: number) => 
      'text' in elem ? (
        <span key={index}>{elem['text']}</span>
      ) : (
        <InlineMath key={index} math={elem['tex']} />
      )
    )
  }
  </span>
}