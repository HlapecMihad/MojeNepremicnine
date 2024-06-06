import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import api from "../services/api";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { strengthColor, strengthIndicator } from '../utils/password-strength';

const Registracija = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for managing the success message
  const [open, setOpen] = useState(false); // State for managing the modal visibility
  const history = useHistory(); // Hook for navigation
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const registerUser = async (values) => {
    try {
      const response = await api.post('/uporabniki/registracija', values);
      const data = response.data;
      console.log(data);
      setSuccessMessage("Registracija je bila uspešna.<br/><br/>Preusmerjanje na prijavo...");
      setOpen(true); // Open the modal
      setTimeout(() => {
        setOpen(false); // Close the modal after 3 seconds
        history.push('/prijava'); // Redirect to /prijava
      }, 3000);
    } catch (error) {
      console.error("There was an error registering the user!", error);
      alert("Napaka pri registraciji.");
    }
  };

  return (
    <div>
      <div>
        <h1 className="middle marginTopPrijava">Registracija</h1>
      </div>
      <Box sx={{ 
        padding: 3, 
        maxWidth: 700, 
        margin: 'auto',
        marginBottom: 3, 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center',
        boxShadow: 3, 
        borderRadius: 2 
      }}>
        <Formik
          initialValues={{
            ime: '',
            priimek: '',
            email: '',
            geslo: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            ime: Yup.string().max(255).required('Ime je obvezno'),
            priimek: Yup.string().max(255).required('Priimek je obvezen'),
            email: Yup.string().email('Mora biti veljaven email').max(255).required('Email je obvezen'),
            geslo: Yup.string().max(255).required('Geslo je obvezno')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await registerUser(values);
              setStatus({ success: true });
              setSubmitting(false);
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="ime-register">Ime*</InputLabel>
                    <OutlinedInput
                      id="ime-register"
                      type="text"
                      value={values.ime}
                      name="ime"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vnesite ime"
                      fullWidth
                      error={Boolean(touched.ime && errors.ime)}
                    />
                    {touched.ime && errors.ime && (
                      <FormHelperText error id="helper-text-ime-register">
                        {errors.ime}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="priimek-register">Priimek*</InputLabel>
                    <OutlinedInput
                      id="priimek-register"
                      type="text"
                      value={values.priimek}
                      name="priimek"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vnesite priimek"
                      fullWidth
                      error={Boolean(touched.priimek && errors.priimek)}
                    />
                    {touched.priimek && errors.priimek && (
                      <FormHelperText error id="helper-text-priimek-register">
                        {errors.priimek}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-register">Email naslov*</InputLabel>
                    <OutlinedInput
                      id="email-register"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Vnesite email"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-register">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="geslo-register">Geslo*</InputLabel>
                    <OutlinedInput
                      id="geslo-register"
                      type={showPassword ? 'text' : 'password'}
                      value={values.geslo}
                      name="geslo"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Vnesite geslo"
                      fullWidth
                      error={Boolean(touched.geslo && errors.geslo)}
                    />
                    {touched.geslo && errors.geslo && (
                      <FormHelperText error id="helper-text-geslo-register">
                        {errors.geslo}
                      </FormHelperText>
                    )}
                  </Stack>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Registracija
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            marginTop: 60, // Move the dialog a bit up the screen
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ paddingBottom: theme.spacing(1) }}>
          Registracija uspešna!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginBottom: theme.spacing(2) }}
            dangerouslySetInnerHTML={{ __html: successMessage }}
          >
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Zapri
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Registracija;