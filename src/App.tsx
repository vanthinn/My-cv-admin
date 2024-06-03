import DefaultLayout from '@layouts/DefaultLayout/DefaultLayout'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { routerAdmin } from '@routes/router'
import Login from '@pages/Login'
import NotFound from '@pages/NotFound'
import ProtectedRoute from '@routes/ProtectedRoute'
import RedirectForum from '@routes/RedirectForum'
import { useEffect } from 'react'
import Notify from '@components/Notify'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  authActionSelector,
  authStateSelector,
  notifyActionSelector,
  notifyStateSelector,
  userActionSelector,
} from './store'

function App() {
  const { notifySetting } = useStoreState(notifyStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)

  const { getCurrentUser } = useStoreActions(userActionSelector)
  const { accessToken } = useStoreState(authStateSelector)
  const { setAccessToken } = useStoreActions(authActionSelector)

  const auth: any = JSON.parse(String(localStorage.getItem('auth')))

  const getCurrentUserApp = async (): Promise<void> => {
    await getCurrentUser()
  }
  useEffect(() => {
    if (auth) {
      setAccessToken(auth.accessToken)
    }
  }, [auth])

  useEffect(() => {
    if (accessToken) getCurrentUserApp()
  }, [accessToken])
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }>
          {routerAdmin.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            )
          })}
        </Route>
        <Route
          path='/login'
          element={
            <RedirectForum>
              <Login />
            </RedirectForum>
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>

      <Notify
        notifySetting={notifySetting}
        setNotifySetting={setNotifySetting}
      />
    </>
  )
}

export default App
