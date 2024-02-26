import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:3000/register");
    console.log(data);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      const token = data.token;
      alert("Login successful");
      setusername("");
      setpassword("");
      fetchUsers();
      navigate("/home");
      window.location.reload();
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("Login Error", error);
    }
  };
  return (
    <div className="bg-white h-screen w-screen justify-center flex items-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-2xl rounded-lg h-96 w-full p-6  pb-8 mb-4  border-black"
        >
          <h2 className="text-center font-semibold text-xl mb-5">Login</h2>
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-1 px-3  rounded-lg focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
