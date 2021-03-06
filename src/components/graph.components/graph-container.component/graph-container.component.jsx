import React from 'react';
import { useState } from 'react';
import '../node.component/graph-node.style.css';
import Node from '../node.component/graph-node.component';
import '../graph-container.component/graph.style.css'

const GraphContainer = (props) => {
    const [activeNode, setActiveNode] = useState("none");
    const [Nodes, setNodes] = useState([
        {
            id: 1,
            xDiff: 0,
            yDiff: 0,
            X: 0,
            Y: 0,
            isMoving: false,
            transition: "0s ease-in-out",
            transform: "scale(1)"
        },
    ]);   
    const startMove = (e) =>{
        console.log("found X at: "+e.clientX)
        setNodes(
            Nodes.map(item => 
                item.id == e.target.id 
                ? {...item, X: item.xDiff + e.clientX, Y: item.yDiff + e.clientY, isMoving: !item.isMoving}
                : item
                )
        );
    }
    const moving = (e) =>{
        setNodes(
            Nodes.map(item => 
                item.id == e.target.id & item.isMoving != false
                ? {...item, xDiff: item.X - e.clientX, yDiff: item.Y - e.clientY}
                : item
                )
        );
    }
    const endMove = (e) =>{
        setNodes(
            Nodes.map(item => item.id == e.target.id ? {...item, isMoving: !item.isMoving} : item)
        )
    }
    const handleNodeSelection = (e) =>{
        console.log(e)
        setActiveNode(e.target.id)
    }
    const addNewNode = () =>{
        var newId = maxIdValue(Nodes);

        var newNode = {
            id: newId,
            xDiff: 0,
            yDiff: 0,
            X: 0,
            Y: 0,
            isMoving: false,
            transition: "0s ease-in-out", 
            transform: "scale(1)"
        }
        setNodes(Nodes => [...Nodes, newNode])
    }
    const maxIdValue = (array) =>{
        var idList = array.map(item => item.id);
        var maxId = Math.max(...idList) + 1;
        return maxId;
    }
    const removeNode = (e) =>{
        setNodes(Nodes.filter(node => node.id != e.target.id))
    }
    const removalTransition = (e) =>{
        setNodes(
            Nodes.map(item => 
                item.id == e.target.id 
                ? {...item, transition: "0.5s ease-in-out", transform: "scale(0)"}
                : item
                )
        );
    }

    return (
        <div  className="graph-container">
            <div 
                className="track-field"
                onMouseDown={(e) => startMove(e)}
                onMouseUp={(e) => endMove(e)}
                onMouseMove={(e) => moving(e)}
                onDoubleClick={(e) => removalTransition(e)}
                onTransitionEnd={(e) => removeNode(e)}
            >
                <div className="btn-bar">
                    <div className="box-control" onClick={addNewNode}>Add new box!</div>
                </div>
                <h2 style={{userSelect: "none"}}>Current Node: {activeNode}</h2>
                {
                    Nodes.map(node => (
                        <Node 
                            key={node.id} 
                            id={node.id} 
                            xDiff={node.xDiff} 
                            yDiff={node.yDiff} 
                            handleNodeSelection={handleNodeSelection} 
                            transition={node.transition}
                            scale={node.transform}
                            children={props.children}
                        />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default GraphContainer
