import ReactFlow, { Controls } from 'react-flow-renderer';

export default function DiagramCanvas() {
  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow>
        <Controls />
      </ReactFlow>
    </div>
  );
}
