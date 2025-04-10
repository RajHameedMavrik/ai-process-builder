import { ReactFlow, Controls, useNodesState, useEdgesState, Node, Edge } 
from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect } from 'react';

interface DiagramCanvasProps {
    data: {
      nodes: Node<{ label: string }>[];
      edges: Edge[];
    } | null;
  }

  export default function DiagramCanvas({ data }: DiagramCanvasProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<{ label: string }>>(data?.nodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(data?.edges || []);
    const nodeStyle = {
      background: '#6366f1',  // Indigo-600
      color: 'white',
      padding: 10,
      borderRadius: 8,
    };
   // useEffect to handle data updates
    useEffect(() => {
      if (data) {
        setNodes(data.nodes);
        setEdges(data.edges);
      }
  }, [data, setNodes, setEdges]);

    return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView // Automatically zoom to fit nodes
        nodeTypes={{ default: ({ data }) => (
          <div style={nodeStyle}>{data.label}</div>
        )}}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
