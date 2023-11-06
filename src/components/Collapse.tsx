import React from 'react'
export interface CollapseProps {
    content : React.ReactNode
}
export function Collapse(props : CollapseProps){
    const {content} = props;
    const [open, setOpen] = React.useState(false);
    return <span>
        <button onClick={() => setOpen((prevOpen) => !prevOpen)}>
            {open ? '-' : '+'}
        </button>
        {open && content}
    </span>
}