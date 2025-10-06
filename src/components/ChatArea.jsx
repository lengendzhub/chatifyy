import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaPhone, FaVideo, FaInfo, FaPaperclip, FaEnvelope, FaComment } from 'react-icons/fa';

export function ChatArea({ contact, messages, onSendSMS, onSendEmail }) {
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const headerContent = useMemo(() => {
    if (!contact) {
      return {
        name: 'Select a contact to start chatting',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        status: 'Online',
      };
    }
    return {
      name: contact.name,
      avatar: contact.avatar,
      status: contact.online ? 'Online' : 'Offline',
    };
  }, [contact]);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (draft.trim()) {
        onSendSMS(draft);
        setDraft('');
      }
    }
  };

  return (
    <section className="chat-area liquid-glass">
      <div className="chat-header">
        <div className="current-contact">
          <img src={headerContent.avatar} alt="Contact" className="current-contact-pic" />
          <div className="current-contact-info">
            <h3>{headerContent.name}</h3>
            <p>{headerContent.status}</p>
          </div>
        </div>
        <div className="header-actions">
          <button title="Call"><FaPhone /></button>
          <button title="Video"><FaVideo /></button>
          <button title="Info"><FaInfo /></button>
        </div>
      </div>

      <div className="messages-container" ref={containerRef}>
        {!contact ? (
          <div className="welcome-message">
            <p>Select a contact from your list to start messaging</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              <p>
                {msg.text} {msg.viaEmail ? <span className="email-indicator">Email</span> : null}
              </p>
              <div className="message-time">{msg.time}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input-container">
        <div className="message-input-wrapper">
          <div className="message-input">
            <button title="Attach"><FaPaperclip /></button>
            <input
              type="text"
              placeholder="Type a message..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleEnter}
              disabled={!contact}
            />
          </div>
          <div className="send-options">
            <button onClick={() => { if (contact && draft.trim()) { onSendEmail(draft); setDraft(''); } }} disabled={!contact}>
              <FaEnvelope style={{ marginRight: 6 }} /> Email
            </button>
            <button onClick={() => { if (contact && draft.trim()) { onSendSMS(draft); setDraft(''); } }} disabled={!contact}>
              <FaComment style={{ marginRight: 6 }} /> SMS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}