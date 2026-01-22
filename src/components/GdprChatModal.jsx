import React, { useState, useRef, useEffect } from 'react';

const GdprChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your GDPR assistant. I can answer questions about the General Data Protection Regulation based on the official EU regulation document. Ask me about data subject rights, legal bases for processing, penalties, or any other GDPR topic!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const quickQuestions = [
    "What is GDPR?",
    "What rights do data subjects have?",
    "What are the penalties for violations?",
    "What is Article 5 about?",
  ];

  const sendMessage = async (messageText) => {
    const userMessage = messageText || input.trim();
    if (!userMessage || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gdpr-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: userMessage,
          sessionId: sessionId,
        }),
      });

      const data = await response.json();

      if (data.ok && data.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response },
        ]);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          content: `Sorry, there was an error: ${error.message}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
    >
      <div 
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '700px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div 
          className="modal-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '16px 16px 0 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '32px' }}>🛡️</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>GDPR Assistant</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.9 }}>
                Ask questions about data protection regulation
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <div 
          style={{
            display: 'flex',
            gap: '8px',
            padding: '16px 20px',
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e9ecef',
            overflowX: 'auto',
            flexWrap: 'wrap',
          }}
        >
          {quickQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(question)}
              disabled={isLoading}
              style={{
                padding: '8px 16px',
                background: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '20px',
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                color: '#495057',
              }}
            >
              {question}
            </button>
          ))}
        </div>

        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            maxHeight: '500px',
          }}
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              }}
            >
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0,
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {msg.role === 'user' ? '👤' : msg.role === 'error' ? '⚠️' : '🤖'}
              </div>
              <div style={{ flex: 1, maxWidth: '75%' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#6c757d', marginBottom: '6px' }}>
                  {msg.role === 'user' ? 'You' : msg.role === 'error' ? 'Error' : 'GDPR Bot'}
                </div>
                <div 
                  style={{
                    background: msg.role === 'user' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : msg.role === 'error' 
                      ? '#fee' 
                      : 'white',
                    color: msg.role === 'user' ? 'white' : msg.role === 'error' ? '#c33' : '#333',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    lineHeight: 1.5,
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    border: msg.role === 'error' ? '1px solid #fcc' : 'none',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#6c757d', marginBottom: '6px' }}>
                  GDPR Bot
                </div>
                <div style={{ display: 'flex', gap: '6px', padding: '8px 0' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', animation: 'bounce 1.4s infinite ease-in-out' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '-0.16s' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '-0.32s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div 
          style={{
            display: 'flex',
            gap: '12px',
            padding: '20px',
            background: 'white',
            borderTop: '1px solid #e9ecef',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask about GDPR..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '12px 18px',
              border: '2px solid #e9ecef',
              borderRadius: '24px',
              fontSize: '14px',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: (isLoading || !input.trim()) ? 0.5 : 1,
            }}
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>

        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 20px',
            background: '#f8f9fa',
            borderRadius: '0 0 16px 16px',
            fontSize: '11px',
            color: '#6c757d',
          }}
        >
          <span style={{ fontFamily: 'monospace' }}>Session: {sessionId.slice(-8)}</span>
          <span style={{ fontStyle: 'italic' }}>Powered by n8n + OpenAI</span>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default GdprChatModal;