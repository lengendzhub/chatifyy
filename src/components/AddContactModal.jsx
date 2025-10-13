import React, { useState, useEffect } from 'react';

export function AddContactModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (name && (email || phone)) {
      onSubmit(name, email, phone);
    } else {
      alert('Please enter at least a name and either email or phone number');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Contact</h3>
          <button className="close-modal" onClick={onClose}>×</button>
        </div>
        <div className="form-group">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" type="text" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="contact-phone">Phone</label>
          <input id="contact-phone" type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="submit-btn" onClick={handleSubmit}>Add Contact</button>
        </div>
      </div>
    </div>
  );
}