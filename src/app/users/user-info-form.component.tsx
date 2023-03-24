import {
    Box,
    Button,
    CssBaseline,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
    FormControlLabel, Checkbox
} from '@mui/material';
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {useUserInfoSelector} from "./store/users.selectors";
import {getUserInfo, updateUserInfo} from "./store/users.actions";
import {useForm, Controller} from "react-hook-form";
import {schema} from "./user-info-form.constants";
import {yupResolver} from "@hookform/resolvers/yup";
import {UpdateUserInfoDtoType} from "./types/update-user-info-dto.type";



type PropsType = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
}

    const UserInfoForm = ({handleSubmit} : PropsType) => {



    const dispatch = useAppDispatch();
    const {userInfo} = useUserInfoSelector();
    const [inputFirstName, setInputFirstName] = useState<string | null | undefined>('');
    const [inputLastName, setInputLastName] = useState<string | undefined>('');
    const [inputPhone, setInputPhone] = useState<string | undefined>('');
    const [inputAddress, setInputAddress] = useState<string | undefined>('');


    useEffect(() => {
        dispatch(getUserInfo())
            .then ((data) => {
                setInputFirstName(data.payload.firstName);
                setInputLastName(data.payload.lastName);
                setInputPhone(data.payload.phone);
                setInputAddress(data.payload.address);
                console.log(data.payload.firstName);
        })
    }, [dispatch])


  const [disabled, setDisabled] = React.useState(true);


  return (
      <Grid container sx={{justifyContent: 'center'}}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
                textAlign: 'center'
            }}
          >
              Your personal information
            <Typography component="h1" variant="h5">
            </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                value={inputFirstName}
                name="firstname"
                autoComplete="firstname"
                disabled={disabled}
                onChange={(e) => setInputFirstName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastname"
                value={inputLastName}
                id="lastname"
                autoComplete="lastname"
                disabled={disabled}
                onChange={(e) => setInputLastName(e.target.value)}
              />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    value={inputPhone}
                    id="phone"
                    autoComplete="phone"
                    disabled={disabled}
                    onChange={(e) => setInputPhone(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="address"
                    value={inputAddress}
                    id="address"
                    autoComplete="address"
                    disabled={disabled}
                    onChange={(e) => setInputAddress(e.target.value)}

                />
                <FormControlLabel control={<Checkbox  />} label="Update info" onChange={()=> setDisabled(!disabled)} />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '20px',
                  backgroundColor: '#6e5f55'
                }}
              >
                submit
              </Button>
              <Grid container>
                <Grid
                  container
                  item
                  sx={{marginTop: '30px'}}
                >
                  <Link
                    href="/"
                    style={{
                      textDecoration: 'none',
                      color: 'white'
                    }}
                  >
                  </Link>
                </Grid>
              </Grid>
           </Box>
         </Grid>
       </Grid>
  )
}

export default UserInfoForm;