import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const EventCard = (props) => {
  const {
    keyValue,
    eventName,
    eventCategory,
    startDate,
    endDate,
    selectedEvent,
    buttonName,
  } = props;

  const handleSelectButtonClicked = (e) => {
    selectedEvent(e);
  };
  return (
    <Stack className="m-10 w-[350px] h-[250px] border-2 border-black  rounded-md items-center">
      <Stack className="ml-2 my-4 space-y-3">
        <Stack direction="row">
          <Typography fontWeight='bold' >Event id : </Typography>
          {keyValue}
        </Stack>
        <Stack direction="row">
          <Typography fontWeight='bold' >Event name : </Typography>
          {eventName}
        </Stack>
        <Stack direction="row">
            <Typography fontWeight='bold' >Event Category :</Typography>
            {eventCategory}
        </Stack>
        <Stack direction="row">
          <Typography fontWeight='bold' >Start Date : </Typography>
          {startDate}
        </Stack>
        <Stack direction="row">
          <Typography fontWeight='bold' >End Date : </Typography>
          {endDate}
        </Stack>
      </Stack>

      <Button
        variant="contained"
        className="w-28 "
        onClick={(e) => handleSelectButtonClicked(keyValue)}
      >
        {buttonName}
      </Button>
    </Stack>
  );
};

export default EventCard;
