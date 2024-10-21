import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getRequest } from "./api";
import { enqueueSnackbar } from "notistack";
import LogoutButton from "./LogoutButton";
import  {ApiRoutes} from "./common/AppRoutes"

function App() {
  const [responseCopy, setResponseCopy] = useState([]);
  const location = useLocation();
  const data = location.state;
  const [selectedEventArray, setSelectedEventArray] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponse = await getRequest(
          ApiRoutes.ALL_EVENTS
        );
        setResponseCopy(eventResponse.data);

        const userEventsResponse = await getRequest(
          `http://localhost:1000/api/user/events/${data}`
        );
        setSelectedEventArray(userEventsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        enqueueSnackbar(error.message ?? "Error fetching data", {
          variant: "error",
        });
      }
    };

    fetchEvents();
  }, [data]);


  const selectedEvent = async (keyValue) => {
    const payload = {
      eventId: keyValue,
    };  

    try {
      const response = await axios.post(`http://localhost:1000/api/user/${data}/register`,payload
);

      if (response.status === 200) {
        enqueueSnackbar("Event registered successfully", {
          variant: "success",
        });

        const newEvent = responseCopy.find((event) => event._id === keyValue);
        if (newEvent) {
          setSelectedEventArray((prev) => [...prev, newEvent]);

          setResponseCopy((prev) =>
            prev.filter((event) => event._id !== keyValue)
          );
        }
      }
    } catch (error) {
      console.error("Error registering event:", error);
      enqueueSnackbar(error.message ?? "Error registering event", {
        variant: "error",
      });
    }
  };

  const removeEvent = async (keyValue) => {
    const payload = {
      eventId: keyValue,
    };

    try {
      const response = await axios.post(`http://localhost:1000/api/user/${data}/unregister`,payload);

      if (response.status === 200) {
        enqueueSnackbar("Event unregistered successfully", {
          variant: "success",
        });

        const removedEvent = selectedEventArray.find(
          (event) => event._id === keyValue
        );
        if (removedEvent) {
          setSelectedEventArray((prev) =>
            prev.filter((event) => event._id !== keyValue)
          );

          setResponseCopy((prev) => [...prev, removedEvent]);
        }
      }
    } catch (error) {
      console.error("Error unregistering event:", error);
      enqueueSnackbar(error.message ?? "Error unregistering event", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Stack className="items-center">
        <LogoutButton  />
      </Stack>
      <Stack className="ml-4">
        {responseCopy.length > 0 && (
          <div className="border-2 rounded-md bg-slate-50">
            <Stack className="items-center mt-6">
              <Typography variant="h5">All Events</Typography>
            </Stack>
            <div className="flex flex-row p-4 overflow-x-auto space-x-0">
              {responseCopy.map((data, index) => (
                <EventCard
                  key={data._id}
                  keyValue={data._id}
                  image={data.image}
                  eventName={data.event_name}
                  eventCategory={data.event_category}
                  startDate={data.start_time}
                  endDate={data.end_time}
                  selectedEvent={selectedEvent}
                  buttonName="Select"
                  index={index}
                  status={data.status}
                />
              ))}
            </div>
          </div>
        )}

        <Stack className="mt-7">
          {selectedEventArray.length > 0 && (
            <div className="border-2 rounded-md bg-slate-50">
              <Stack className="items-center mt-6">
                <Typography variant="h5">Selected Events</Typography>
              </Stack>
              <div className="flex flex-row p-4 overflow-x-auto">
                {selectedEventArray.map((data, index) => (
                  <EventCard
                    key={data._id}
                    keyValue={data._id}
                    image={data.image}
                    eventName={data.event_name}
                    eventCategory={data.event_category}
                    startDate={data.start_time}
                    endDate={data.end_time}
                    selectedEvent={removeEvent}
                    buttonName="Remove"
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default App;
