import React from "react";

const EventCard = ({ event, onClick }) => {
  return (
    <div
      className="event-card border rounded-lg p-4 shadow-md hover:shadow-lg cursor-pointer"
      onClick={() => onClick(event)}
    >
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-600 mb-1">{event.description}</p>
      <p className="text-sm text-gray-500">
        Type: <span className="font-medium">{event.type}</span>
      </p>
      <p className="text-sm text-gray-500">
        Organizer: <span className="font-medium">{event.organizerName}</span>
      </p>
      <p className="text-sm text-gray-500">
        Date:{" "}
        <span className="font-medium">
          {new Date(event.startDate).toLocaleDateString()} -{" "}
          {new Date(event.endDate).toLocaleDateString()}
        </span>
      </p>
      <p className="text-sm text-gray-500">
        Registration Limit: <span className="font-medium">{event.registrationLimit}</span>
      </p>
    </div>
  );
};

export default EventCard;
