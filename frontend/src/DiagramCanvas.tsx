import ReactFlow, { Controls, Node, Edge } from 'react-flow-renderer';

interface DiagramCanvasProps {
  data: {
    nodes: Node[];
    edges: Edge[];
  } | null;
}

// Add this function to generate positions
const generateLayout = (nodes: Node[], edges: Edge[]) => {
    return nodes.map((node, index) => ({
      ...node,
      position: { x: index * 250, y: 50 },
    }));
  };
  
  // Update the component
  export default function DiagramCanvas({ data }: DiagramCanvasProps) {
    const layoutNodes = generateLayout(data?.nodes || [], data?.edges || []);
    
    return (
      <div style={{ height: '100vh' }}>
        <ReactFlow nodes={layoutNodes} edges={data?.edges || []}>
          <Controls />
        </ReactFlow>
      </div>
    );
  }
  