import React from 'react'
import '../graph-container.component/graph.style.css';

const Node = ({ xDiff, yDiff, handleNodeSelection, id, transition, scale, children }) => {
    return (
        <div 
            className="node-container"
            style={{transform: `translate(${xDiff *(-1)}px, ${yDiff *(-1)}px) ${scale}`, transition: `${transition}` }}
        >
            <div id={id} onMouseDown={(e) => handleNodeSelection(e)} className="node-wrapper">
                <div style={{position: 'relative', zIndex: '-1', userSelect: 'none'}}>
                    {
                        children
                    }
                </div>
            </div>
            
        </div> 
    )
}

export default Node
