import React, { useState } from 'react';
import DiagramCanvas from './DiagramCanvas';

function App(): React.JSX.Element {
  const [inputText, setInputText] = useState('');
  const [diagramData, setDiagramData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.elvengen.ai/generate-diagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: inputText }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (!data?.nodes || !data?.edges) throw new Error('Invalid diagram data');
      
      setDiagramData(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to generate diagram');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      {/* Input and Generate Button */}
      <div style={{ marginBottom: '20px' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe the system or process..."
          rows={4}
          style={{ width: '400px', marginRight: '10px' }}
        />
        <button 
          onClick={handleGenerate} 
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? 'Generating...' : 'Generate Diagram'}
        </button>
      </div>

      {/* Diagram Output (Temporary Placeholder) */}
      {diagramData ? (
        <pre>{JSON.stringify(diagramData, null, 2)}</pre>
      ) : (
        <div>No diagram data available</div>
      )}
    </div>
  );
}

export default App;
