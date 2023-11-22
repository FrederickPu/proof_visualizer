import React from 'react'
import './styles.modules.css'

export interface CollapseProps {
    placeholder? : React.ReactNode,
    content : React.ReactNode,
}
export function Collapse(props : CollapseProps){
    const {content, placeholder} = props;
    const [hover, setHover] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    console.log(content)

    return <span className={hover ? 'highlighted' : 'sad'}>
        <span className="explanation_refinement_button button_unexpand"
            onClick={() => setOpen((prevOpen) => !prevOpen)} 
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}>
                {open ? '⊖' : '⊕'}
        </span>
        {open ? "" : (placeholder || "")}
        {open && content}
    </span>
}