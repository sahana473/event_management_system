import { Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { postRequest } from "./api";
import { useState } from "react";

const UserFormData = ({
  title,
  url,
  buttonLabel,
  onSuccessMessage,
  redirectOnSuccess,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (!userId.trim()) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

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
      enqueueSnackbar(error?.response?.data?.error || "Something went wrong", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setError(false); 
    setUserId(e.target.value);
  };

  return (
    <div className="mt-60">
      <Typography variant="h4" className="text-center">
        {title}
      </Typography>
      <Stack className="row mt-10">
        <TextField
          type="text"
          label="UserId"
          variant="outlined"
          id="userId"
          name="userId"
          className="w-80"
          error={error}
          helperText={error ? "Enter your user id" : ""}
          onChange={handleOnChange}
        />
        <Stack className="mt-8">
          <LoadingButton
            variant="contained"
            className="bg-slate-600"
            size="medium"
            onClick={handleButtonClick}
            disabled={loading}
            loading={loading}
          >
            {buttonLabel}
          </LoadingButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default UserFormData;
