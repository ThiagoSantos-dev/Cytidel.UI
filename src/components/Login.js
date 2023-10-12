import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "../hooks/AuthService";

const Login = () => {
  //initiate navigation
  const navigate = useNavigate();
  //payload to login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //handle any changes on the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //send request to the api to LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login(formData);
      const { data } = response;
      //check if received the authentication
      if (AuthService.isAuthenticated()) {
        //navigate the user to the list of tasks
        navigate("/tasks");
      } else {
        //notify the user if had any issues on the login.
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      //notify the user if the credentials is not valid.
      alert("Login failed invalid credential");
    }
  };

  return (
    <section>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
