import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import './App.css';


//? components
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

//?Components
import LoginForm from './layout/components/LoginForm';

//?pages
import Home from './page/Home'

//? context
import { UserProvider } from './context/UserContext';

//? toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  //? popup
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <Router>
      <UserProvider>
        <Navbar />
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover theme="colored" />
        <LoginForm isShowLogin={handleClose} open={open} />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
