import React from 'react'
export interface CollapseProps {
    content : React.ReactNode
}
export function Collapse(props : CollapseProps){
    const {content} = props;
    const [open, setOpen] = React.useState(false);
    return <span>
        <span className="explanation_refinement_button button_unexpand" onClick={() => setOpen((prevOpen) => !prevOpen)}>{open ? '⊖' : '⊕'}</span>
        {open && content}
    </span>
}