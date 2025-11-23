import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'https://6f3kzokgoe.execute-api.us-east-1.amazonaws.com/prod';

interface SampleQuestion {
  text: string;
}

interface QueryResponse {
  answer: string;
  sources: number;
}

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [sampleQuestions, setSampleQuestions] = useState<string[]>([]);
  const [sources, setSources] = useState(0);

  useEffect(() => {
    fetchSampleQuestions();
  }, []);

  const fetchSampleQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/samples`);
      const data = await response.json();
      setSampleQuestions(data.samples || []);
    } catch (error) {
      console.error('Error fetching sample questions:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    setSources(0);

    try {
      const response = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      const data: QueryResponse = await response.json();
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (error) {
      console.error('Error querying:', error);
      setAnswer('Sorry, there was an error processing your question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (sampleQuestion: string) => {
    setQuestion(sampleQuestion);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>RAG Question Answering System</h1>
        <p>Ask questions about SaaS architecture and get detailed answers from our knowledge base</p>
      </header>

      <main className="main-content">
        <div className="question-section">
          <h2>Ask a Question</h2>
          <form onSubmit={handleSubmit} className="question-form">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question about SaaS architecture..."
              rows={4}
              className="question-input"
            />
            <button 
              type="submit" 
              disabled={loading || !question.trim()}
              className="submit-button"
            >
              {loading ? 'Processing...' : 'Ask Question'}
            </button>
          </form>
        </div>

        <div className="samples-section">
          <h2>Sample Questions</h2>
          <div className="sample-questions">
            {sampleQuestions.map((sample, index) => (
              <button
                key={index}
                onClick={() => handleSampleClick(sample)}
                className="sample-button"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {answer && (
          <div className="answer-section">
            <h2>Answer</h2>
            <div className="answer-content">
              <p className="sources-info">Sources found: {sources}</p>
              <div className="answer-text">
                {answer.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
