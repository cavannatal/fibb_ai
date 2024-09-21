import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import aclimg from './images/acl.webp';
import ashores from './images/ashores.jpg';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "Fibb.ai Fam & Friends Pre-Launch Party",
    date: "October 9, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Auditorium Shores, Austin, Texas",
    description: "Come and go as you please—drop by anytime and stay for as long as you’d like! Don’t miss out on this fun and informative evening. We can’t wait to see you there!",
    imageUrl: ashores
  },
  {
    id: "2",
    title: "Austin City Limits Launch",
    date: "October 11, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "Zilker Park, Austin, Texas",
    description: "Join us at ACL for an exclusive photo opportunity at our launch event!",
    imageUrl: aclimg
  },
];

const EventCard: React.FC<Event & { isActive: boolean; onClick: () => void }> = ({ 
    title, date, time, location, description, imageUrl, isActive, onClick 
  }) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer
                  ${isActive ? 'md:col-span-2' : ''}`}
      onClick={onClick}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center text-gray-300 text-sm sm:text-base mb-2">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-gray-300 text-sm sm:text-base mb-2">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-gray-300 text-sm sm:text-base mb-4">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{location}</span>
        </div>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-400 text-sm sm:text-base mb-4">{description}</p>
              <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base">
                Register Now <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
  
  const EventsPage: React.FC = () => {
    const [activeEvent, setActiveEvent] = useState<string | null>(null);
  
    const handleEventClick = (eventId: string) => {
      setActiveEvent(activeEvent === eventId ? null : eventId);
    };
  
    return (
      <section className="min-h-screen flex flex-col items-center justify-start px-4 py-12 bg-gray-900">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-purple-500 to-blue-600"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          Upcoming Events
        </motion.h1>
        
        <motion.div
          layout
          className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <AnimatePresence>
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                {...event} 
                isActive={activeEvent === event.id}
                onClick={() => handleEventClick(event.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    );
  };
  
  export default EventsPage;