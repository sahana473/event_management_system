import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import {statusColors,bgColors} from "../src/constants"
const EventCard = (props) => {
  const {
    image,
    keyValue,
    eventName,
    eventCategory,
    startDate,
    endDate,
    selectedEvent,
    buttonName,
    index,
    status,
  } = props;

 
  const bgColor = bgColors[index % bgColors.length];

  const handleSelectButtonClicked = (e) => {
    selectedEvent(e);
  };
  return (
    <>
      <Stack className=" whitespace-nowrap p-4">
        <Stack
          className={`m-7 w-[350px] h-[450px] border-2 border-black rounded-md items-center ${bgColor}`}
        >
          <Stack className="my-6 space-y-3">
            <Stack className="relative ">
              <img
                src={image}
                alt={eventName}
                className="w-full h-40 object-cover rounded-md mb-2 "
              />
              <Stack
                className={`absolute right-0.5 bottom-2.5 w-fit h-6 ${statusColors(
                  status
                )}`}
              >
                {status}
              </Stack>
            </Stack>
            <Stack direction="row">
              <Typography fontWeight="bold">Event id : </Typography>
              {keyValue}
            </Stack>
            <Stack direction="row">
              <Typography fontWeight="bold">Event name : </Typography>
              {eventName}
            </Stack>
            <Stack direction="row">
              <Typography fontWeight="bold">Event Category :</Typography>
              {eventCategory}
            </Stack>
            <Stack direction="row">
              <Typography fontWeight="bold">Start Date : </Typography>
              {startDate}
            </Stack>
            <Stack direction="row">
              <Typography fontWeight="bold">End Date : </Typography>
              {endDate}
            </Stack>
          </Stack>

          <Button
            variant="contained"
            className="w-28 hover:bg-blue-300 hover:text-gray-800"
            onClick={(e) => handleSelectButtonClicked(keyValue)}
            // disabled={status === "cancelled"||status === "completed"}
          >
            {buttonName}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default EventCard;
