import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import aclImg from './images/acl.webp';
import ashoresImg from './images/ashores.jpg';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  registrationLink: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "Fibb.ai Fam & Friends Pre-Launch Party",
    date: "October 9, 2024",
    time: "6:15 PM - 8:30 PM",
    location: "Auditorium Shores, Austin, Texas",
    description: "Join us for an exclusive pre-launch celebration! Mingle with the Fibb.ai team, get a sneak peek of our latest features, and enjoy an evening of innovation and fun.",
    imageUrl: ashoresImg,
    registrationLink: "https://partiful.com/e/uTQJe164bu6oYdO6fo8c"
  },
  {
    id: "2",
    title: "Austin City Limits Launch",
    date: "October 11, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Zilker Park, Austin, Texas",
    description: "Be part of history as we officially launch Fibb.ai alongside ACL! Experience our AI-powered photo booth and create unforgettable memories.",
    imageUrl: aclImg,
    registrationLink: "https://www.aclfestival.com/tickets"
  },
];

const EventCard: React.FC<Event & { isExpanded: boolean; onToggle: () => void }> = ({
  title,
  date,
  time,
  location,
  description,
  imageUrl,
  isExpanded,
  onToggle,
  registrationLink
}) => {
  const isExternalLink = registrationLink.startsWith('http');

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      
    >
      <div 
        className="cursor-pointer"
        onClick={onToggle}
      >
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white"
            style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
            >{title}</h3>
          </div>
        </div>
        <div className="p-4 space-y-2" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-600" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
            <Clock className="w-5 h-5 mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-600" style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}>
            <MapPin className="w-5 h-5 mr-2" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 text-lg"
            style={{ fontFamily: '"Font1", sans-serif' }}
          >
            <p className="text-gray-600 mb-4">{description}</p>
            {isExternalLink ? (
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                Register Now <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            ) : (
              <Link
                to={registrationLink}
                className="inline-flex items-center px-9 py-4 bg-[#084248] text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                Register Now <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EventsPage: React.FC = () => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const handleToggle = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <section className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-center text-[#084248]"
          style={{ fontFamily: '"Sofia Pro Bold", sans-serif' }}
        >
          Upcoming Events
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-center mb-12"
          style={{ fontFamily: '"Font1", sans-serif' }}
        >
          Join us for exciting events and be part of the Fibb.ai journey. Experience innovation firsthand and connect with our community.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              {...event} 
              isExpanded={expandedEvent === event.id}
              onToggle={() => handleToggle(event.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;