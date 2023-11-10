// a list of sanity checks which compare the desired behavior of our custom components to their actual behavior
import { useState } from 'react'

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import { InlineLatex } from '../components/InlineLatex.tsx';

import Tippy from '@tippyjs/react';

import {Collapse} from '../components/Collapse.tsx'

import {InlineProof} from '../components/Proof.tsx'
import test from '../assets/testproof.json'

function Regression() {

  return (
    <div>
    <div>
    <h3>Using only Collapse, InlineLatex and Span</h3>
        <p>
          <Collapse
            content={
              <InlineLatex latex=" To prove $f$ is continous, by definition we need to show that for all elements $x$ of $X$ and neighborhooods $V$ of $f(x)$, there exists a neighborhood $U$ of $x$ such that $f[U] \subseteq V$." />
            }
          />
          <InlineLatex latex=" Let $x$ be an element of $X$. " />
          <InlineLatex latex="One can see it suffices to prove that for all closed neighborhoods $V'$ of $f(x)$, there exists a neighborhood $U$ of $x$ such that $f[U] \subseteq V'$. " />
          <Collapse
            content={
              <span>
                {' We see the following argument'}
                <div className="explanation_indent">
                  <InlineLatex
                    latex={"Let $V'$ be a neighborhood of $f(x)$."}
                  />
                </div>
              </span>
            }
            placeholder={"One can obtain"}
          />
          <Tippy
            content={
              <InlineLatex latex={'$V$ is a neighborhood around $f(x)$'} />
            }
          >
            <a>Using the assumption</a>
          </Tippy>
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

export default Regression
