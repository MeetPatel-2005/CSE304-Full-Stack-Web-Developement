import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
      </Routes>
    </div>
  )
};

export default App;