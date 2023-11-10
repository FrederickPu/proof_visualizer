import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import { InlineLatex } from './components/InlineLatex.tsx';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import {Collapse} from './components/Collapse.tsx'

import './App.css'

import {InlineProof} from './components/Proof.tsx'
import test from './assets/testproof.json'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        hrvk yeah
      </div>
      <BlockMath
        math={'\\int_0^\\infty x^2 dx \\int a'}
        errorColor={'#cc0000'}
      />

      <Tippy content={<p>Vite + React
        <InlineMath math={"\\int_0^{\\infty} x^2 dx"}/>
        </p>}>
      <button>My button</button>
    </Tippy>
    <div>
      Omg it's inline:  
      <Collapse content={<span><InlineMath math={"\\forall x, \\int_0^{\\infty} x^2 dx"}/></span>} />
    </div>
    <div>
      <h3>Using Collapse, InlineLatex and Tippy only</h3>
    <p>
      <Collapse content={<InlineLatex latex=' To prove $f$ is continous, by definition we need to show that for all elements $x$ of $X$ and neighborhooods $V$ of $f(x)$, there exists a neighborhood $U$ of $x$ such that $f[U] \subseteq V$.' />}/>
      <InlineLatex latex=' Let $x$ be an element of $X$. '/>
      <span>{"By the "}
      <Tippy content={<InlineLatex latex={"$V$ is a neighborhood of $f(x)$"}/>}>
        <a href="#">assumption</a>
      </Tippy>
      </span>
      {" we see that blah blah blah."}
      <Collapse placeholder={"We can obtain"} content={<InlineLatex latex="$2 + 2 = 4$ minus $1$ is $(h^{-1} \circ h) (3)= 3$ quick maths."/>}/>
    </p>
    </div>
    <div>
      <h3>Using proof objects</h3>
      <p>
        <InlineProof proof={test} />
      </p>
    </div>
    </div>
  )
}

export default App
