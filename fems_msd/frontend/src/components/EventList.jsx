import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events, onEventClick }) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No events found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} onClick={onEventClick} />
      ))}
    </div>
  );
};

export default EventList;
