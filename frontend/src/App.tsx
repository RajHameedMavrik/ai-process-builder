import React, { useState } from 'react';
import DiagramCanvas from './DiagramCanvas';

function App() {
  const [inputText, setInputText] = useState('');
  const [diagramData, setDiagramData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

// Updated handleGenerate function in App.tsx
const handleGenerate = async () => {
  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:5000/generate-diagram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: inputText }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Add validation for diagram data structure
    if (!data?.nodes || !data?.edges) {
      throw new Error('Invalid diagram data received from server');
    }

    setDiagramData(data);
  } catch (error) {
    let errorMessage = 'Failed to generate diagram';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    alert(`Error: ${errorMessage}`);
    console.error('API Error:', error);
  }

  try {
    // ... existing code ...
  } finally {
    setIsLoading(false);
  }
};

const saveDiagram = () => {
  localStorage.setItem('diagram', JSON.stringify(diagramData));
};

const loadDiagram = () => {
  const saved = localStorage.getItem('diagram');
  if (saved) setDiagramData(JSON.parse(saved));
};

// Update button
<button onClick={handleGenerate} disabled={isLoading}>
  {isLoading ? 'Generating...' : 'Generate Diagram'}
</button>

  return (
    <div className="App">
      <div style={{ padding: '20px' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe the system or process you want to diagram..."
          rows={4}
          style={{ width: '400px', marginRight: '10px' }}
        />
        <button onClick={handleGenerate}>Generate Diagram</button>
      </div>
      <DiagramCanvas data={diagramData} />
    </div>
  );
  
}

export default App;
