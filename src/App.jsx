import React, { useMemo, useState, useCallback } from 'react';
import './App.css';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { ChatArea } from './components/ChatArea.jsx';
import { FloatingBackground } from './components/FloatingBackground.jsx';

function getRandomAvatar() {
  const avatars = [
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/men/4.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

const initialContacts = [
  { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1234567890', avatar: getRandomAvatar(), online: true },
  { id: 2, name: 'Emma Johnson', email: 'emma@example.com', phone: '+0987654321', avatar: getRandomAvatar(), online: true },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '+1122334455', avatar: getRandomAvatar(), online: false },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1555666777', avatar: getRandomAvatar(), online: true },
  { id: 5, name: 'David Miller', email: 'david@example.com', phone: '+1888999000', avatar: getRandomAvatar(), online: false },
];

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [currentContactId, setCurrentContactId] = useState(null);
  const [messagesByContactId, setMessagesByContactId] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const currentContact = useMemo(
    () => contacts.find(c => c.id === currentContactId) || null,
    [contacts, currentContactId]
  );

  const filteredContacts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return contacts;
    return contacts.filter(c => c.name.toLowerCase().includes(term));
  }, [contacts, searchTerm]);

  const selectContact = useCallback((contactId) => {
    setCurrentContactId(contactId);
  }, []);

  const addContact = useCallback((name, email, phone) => {
    const newContact = {
      id: contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
      name,
      email: email || '',
      phone: phone || '',
      avatar: getRandomAvatar(),
      online: true,
    };
    setContacts(prev => [...prev, newContact]);
    setIsModalOpen(false);
  }, [contacts]);

  const sendMessage = useCallback((text, { viaEmail = false } = {}) => {
    if (!currentContact || !text || !text.trim()) return;
    const trimmed = text.trim();
    const contactId = currentContact.id;
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    setMessagesByContactId(prev => {
      const existing = prev[contactId] || [];
      const updated = [
        ...existing,
        { text: trimmed, type: 'sent', time, viaEmail },
      ];
      return { ...prev, [contactId]: updated };
    });

    // Auto-reply simulation
    setTimeout(() => {
      setMessagesByContactId(prev => {
        const responses = viaEmail
          ? [
              "Thanks for your email! I'll respond properly soon.",
              "I received your email. Let's discuss this tomorrow.",
              "Got your message via email. Thanks for the update!",
              "Email received. I'll get back to you shortly.",
            ]
          : [
              'Thanks for your message!',
              "I'll get back to you soon.",
              "That's interesting!",
              'Can we discuss this later?',
            ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const timestamp = new Date();
        const replyTime = `${timestamp.getHours()}:${timestamp.getMinutes().toString().padStart(2, '0')}`;
        const existing = prev[contactId] || [];
        const updated = [
          ...existing,
          { text: randomResponse, type: 'received', time: replyTime, viaEmail },
        ];
        return { ...prev, [contactId]: updated };
      });
    }, viaEmail ? 1500 : 1000);
  }, [currentContact]);

  return (
    <div className="app-root">
      <FloatingBackground />
      <div className="chat-app liquid-glass">
        <Header onToggleSidebar={() => setShowSidebar(prev => !prev)} />
        <div className="app-body">
          <Sidebar
            showSidebar={showSidebar}
            user={{
              name: 'Alex Johnson',
              status: 'Online',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            }}
            contacts={filteredContacts}
            allContacts={contacts}
            selectedContactId={currentContactId}
            onSelectContact={selectContact}
            onOpenAddContact={() => setIsModalOpen(true)}
            isAddContactOpen={isModalOpen}
            onCloseAddContact={() => setIsModalOpen(false)}
            onSubmitAddContact={addContact}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          />
          <ChatArea
            contact={currentContact}
            messages={currentContact ? (messagesByContactId[currentContact.id] || []) : []}
            onSendSMS={(text) => sendMessage(text, { viaEmail: false })}
            onSendEmail={(text) => {
              console.log('Simulate Email send');
              sendMessage(text, { viaEmail: true });
            }}
          />
        </div>
      </div>
    </div>
  );
}