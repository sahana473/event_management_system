import { Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';
import { postRequest } from './api';

const UserFormData = ({ title, url, buttonLabel, onSuccessMessage, redirectOnSuccess }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    const userId = document.getElementById("userId").value;

    try {
      const payload = { userId: userId };
      const response = await postRequest(url, payload);

      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar(onSuccessMessage, { variant: "success" });

        if (redirectOnSuccess) {
          navigate(redirectOnSuccess, { state: userId });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Error processing request", { variant: "error" });
    }
  };

  return (
    <div className="mt-60">
      <Typography variant="h4" className="text-center">{title}</Typography>
      <Stack className="row mt-10">
        <TextField
          type="text"
          label="UserId"
          variant="outlined"
          id="userId"
          name="userId"
          className="w-80"
        />
        <Stack className="mt-8">
          <Button
            variant="contained"
            className="bg-slate-600"
            size="medium"
            onClick={handleButtonClick}
          >
            {buttonLabel}
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default UserFormData;
