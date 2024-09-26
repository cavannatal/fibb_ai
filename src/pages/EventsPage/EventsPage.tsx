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
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div 
        className="cursor-pointer"
        onClick={onToggle}
      >
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center text-gray-300">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Clock className="w-5 h-5 mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-300">
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
            className="px-4 pb-4"
          >
            <p className="text-gray-300 mb-4">{description}</p>
            {isExternalLink ? (
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                Register Now <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            ) : (
              <Link
                to={registrationLink}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
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
    <section className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Upcoming Events
          </span>
        </motion.h1>
        
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