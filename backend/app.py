from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv(dotenv_path="/Users/raj/ai-process-builder/backend/.env")

app = Flask(__name__)
CORS(app)


# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.route('/generate-diagram', methods=['POST'])
def generate_diagram():
    try:
        # Get user input
        user_input = request.json.get('description', '')

        # Generate structured diagram data
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": """You are an expert in process modeling. 
                Convert the following description into a structured JSON format 
                with nodes (process steps) and edges (connections). Use lowercase 
                node IDs and edge IDs. Example:
                {
                    "nodes": [
                        {
                            "id": "start", 
                            "data": {"label": "Start"},
                            "position": {"x": 0, "y": 0}
                        }
                    ],
                    "edges": [
                        {"id": "e1", "source": "start", "target": "process"}
                    ]
                }"""},
                {"role": "user", "content": user_input}
            ]
        )


        # Extract and parse the AI response
        ai_output = response.choices[0].message.content
        diagram_data = {"nodes": [], "edges": []}

        # Add error handling for malformed JSON
        try:
            diagram_data = json.loads(ai_output)  # REPLACE eval() WITH json.loads()
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid JSON structure"}), 400

        # ===== ADD THIS SECTION =====
        # Ensure nodes have required fields
        for node in diagram_data.get('nodes', []):
            # Add position if missing
            if 'position' not in node:
                node['position'] = {"x": 0, "y": 0}
            
            # Convert label to data.label format
            if 'label' in node:
                node['data'] = {'label': node['label']}
                del node['label']  # Remove old label format
            elif 'data' not in node:
                node['data'] = {'label': 'Unnamed Node'}

        # ===== END OF ADDED SECTION =====

        return jsonify(diagram_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    print("🔥 Starting Flask server...")
    print(f"OPENAI_API_KEY: {os.getenv('OPENAI_API_KEY')}")
    app.run(port=5000, debug=False)