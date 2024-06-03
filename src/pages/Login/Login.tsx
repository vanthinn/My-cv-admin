import React, { FC, useEffect } from 'react'
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  FormHelperText,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { authActionSelector, authStateSelector, notifyActionSelector } from '@store/index'
import { IUserLogin } from '@interfaces/IUser'
import TextFieldCustom from '@components/TextField'
import Button from '@components/Button/Button'

interface Props {}

const defaultValues: IUserLogin = {
  email: '',
  password: '',
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required'),
  // .matches(/[0-9]{9}@sv1.dut.udn.vn/, `Please use format: 123456789@sv1.dut.udn.vn`)
  password: yup.string().required('Password is required'),
})

const Login: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { messageError, isLoginSuccess } = useStoreState(authStateSelector)

  const { login, setIsLoginSuccess } = useStoreActions(authActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { handleSubmit, control } = useForm<IUserLogin>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const [showPassword, setShowPassword] = React.useState(false)

  useEffect(() => {
    if (!isLoginSuccess && messageError !== '') {
      setNotifySetting({ show: true, status: 'error', message: messageError })
      setIsLoginSuccess(true)
    }
  }, [isLoginSuccess, messageError])

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = async (data: IUserLogin) => {
    setIsLoading(true)
    const newData = { ...data, tenantId: '1fe61ae4-c510-4a61-9117-37df98aabe41' }
    const res = await login(newData)
    if (res) {
      setNotifySetting({ show: true, status: 'success', message: 'Login successful' })
      navigate('/')
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }
  return (
    <div className='h-screen relative'>
      <div className='h-screen'>
        <div className=' bg-gradient-to-b from-[#a1c4fd]  to-[#c2e9fb] w-full min-h-screen z-0'></div>
      </div>
      <div className='absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center '>
        <div
          className='bg-white   z-50 mt-5 rounded-[25px]  px-8 pb-14 
        shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]'>
          <h1 className='m-auto font-semibold text-center text-[28px] py-10'>Welcome</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col min-w-[280px]  gap-4 sm:container bg-opacity-50'>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldCustom
                  error={error}
                  onChange={onChange}
                  value={value}
                  label='Email *'
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl
                  sx={{
                    width: '100%',
                    '& .MuiFormControl-root': {
                      backgroundColor: '#000',
                    },
                  }}
                  error={!!error}
                  variant='standard'>
                  <InputLabel htmlFor='standard-adornment-password'>
                    Mật khẩu *
                  </InputLabel>
                  <Input
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.01)' }}
                    id='standard-adornment-password'
                    name='passWord'
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!!error && (
                    <FormHelperText id='component-error-text'>
                      {error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <div className='flex justify-end'>
              <span
                onClick={() => navigate('/auth/forgot-password')}
                className='text-sm cursor-pointer hover:text-blue-500'>
                Quên mật khẩu?
              </span>
            </div>
            <Button
              // typeButton="blue"
              className='mt-6'
              disabled={isLoading}
              loading={isLoading}>
              Login
            </Button>
          </form>
          <p className='mt-4 text-xs text-center'>
            Do not have an account?{' '}
            <span
              onClick={() => {
                const checkEmployer = pathname.split('/')[1] === 'employer'
                checkEmployer
                  ? navigate('/employer/auth/register')
                  : navigate('/auth/register')
              }}
              className='cursor-pointer text-blue-500 hover:text-blue-700 hover:underline'>
              Register now
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
