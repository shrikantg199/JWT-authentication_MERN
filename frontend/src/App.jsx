import { Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import About from "./components/About";
const App = () => {
  const isUserSigned = !!localStorage.getItem("token");
  return (
    <>
      <Navbar />
      <Routes>
        {isUserSigned && <Route path="/home" element={<Home />} />}
        {isUserSigned && <Route path="/about" element={<About />} />}
        <Route path="/signup" element={<Registration />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
