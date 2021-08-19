import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from '@auth0/auth0-react'
import './App.css'
import Container from '@material-ui/core/Container'
import NavBar from './components/NavBar'
import LoginPage from './components/LoginPage';



function App() {

  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) return (<LoginPage />)

  return (

    <Container
      maxWidth={false}
      style={{ margin: 0 }}>


      <NavBar />


    </Container >

  )
}
export default App;
