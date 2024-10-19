import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";

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

  const bgColors = [
    "bg-green-200 border-green-400 border-2 ",
    "bg-blue-200 border-blue-400 border-2 ",
    "bg-yellow-200 border-yellow-400 border-2 ",
    "bg-purple-200 border-purple-400 border-2",
    "bg-pink-200 border-pink-400 border-2 ",
    "bg-indigo-200 border-indigo-400 border-2 ",
  ];

  const statusColors = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-[#E2FFF0] text-[#27AE60] border-solid border-[#C8FFE1] border-3 text-md px-2 rounded-md';
      case 'ongoing':
        return 'bg-[#FFE0B3] text-[#CC7A00] border-solid border-[#FFCC80] border-3 text-md px-2 rounded-md';
      case 'upcoming':
        return 'bg-[#B3E5FC] text-[#0277BD] border-solid border-[#80D8FF] border-3 text-md px-2 rounded-md';
      case 'cancelled':
        return 'bg-[#FFEBEE] text-[#C62828] border-solid border-[#FFCDD2] border-3 text-md px-2 rounded-md';
      default:
			return 'bg-transparent text-black border-solid border-black';
    }}

  const bgColor = bgColors[index % bgColors.length];

  const handleSelectButtonClicked = (e) => {
    selectedEvent(e);
  };
  return (
    <Stack className=" whitespace-nowrap p-4">
    <Stack
      className={`m-7 w-[350px] h-[450px] border-2 border-black rounded-md items-center ${bgColor}`}
    >
      <Stack className="my-6 space-y-3">
        <Stack className="relative ">
          <img
            src={
              "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzJTIwaW1hZ2UlMjBiYWRtaXRvbnxlbnwwfDB8MHx8fDA%3D"
            }
            alt={eventName}
            className="w-full h-40 object-cover rounded-md mb-2 "
          />
          <Stack className={`absolute right-0.5 bottom-2.5 w-fit h-6 ${statusColors(status)}`}>
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
  );
};

export default EventCard;
