import './App.css';
import GraphContainer from '../src/components/graph.components/graph-container.component/graph-container.component'

function App() {


  return (
    <div className="App">
        <GraphContainer>
          <div style={{maxWidth:'200px'}}>
            <h4 style={{padding:0, margin: 0}}>Some text</h4>
            <p>Some sub-text long textlong textlong textlong textlong text</p>
          </div>
        </GraphContainer>
    </div>
  );
}

export default App;
