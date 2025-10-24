import React from 'react';
import { AddContactModal } from './AddContactModal.jsx';
import { FaMagnifyingGlass, FaUserPlus } from 'react-icons/fa6';

export function Sidebar({
  user,
  contacts,
  selectedContactId,
  onSelectContact,
  onOpenAddContact,
  isAddContactOpen,
  onCloseAddContact,
  onSubmitAddContact,
  searchTerm,
  onSearchTermChange,
  showSidebar,
}) {
  return (
    <aside className={`contacts-sidebar liquid-glass ${showSidebar ? 'sidebar-visible' : ''}`}>
      <div className="user-profile">
        <img src={user.avatar} alt="Profile" className="profile-pic" />
        <div className="user-info">
          <h3>{user.name}</h3>
          <p>{user.status}</p>
        </div>
      </div>

      <div className="search-contacts">
        <div className="search-box">
          <FaMagnifyingGlass style={{ marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
        </div>
      </div>

      <div className="contacts-list">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact-item ${selectedContactId === contact.id ? 'active' : ''}`}
            onClick={() => onSelectContact(contact.id)}
          >
            <div className={`contact-status ${contact.online ? 'online' : ''}`}></div>
            <img src={contact.avatar} alt={contact.name} className="contact-pic" />
            <div className="contact-info">
              <h4>{contact.name}</h4>
              <p>{contact.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="add-contact-btn" onClick={onOpenAddContact}>
        <FaUserPlus style={{ marginRight: 8 }} />
        <span>Add New Contact</span>
      </button>

      <AddContactModal isOpen={isAddContactOpen} onClose={onCloseAddContact} onSubmit={onSubmitAddContact} />
    </aside>
  );
}