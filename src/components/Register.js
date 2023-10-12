import { useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
//base path to access endpoint register
const REGISTER_URL = "/sign-up";

const Register = () => {
  //initiate navigation
  const navigate = useNavigate();
  //check if the request had success response
  const [success, setSuccess] = useState(false);
  //payload to register a user
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    username: "",
  });
  //handle any changes on the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //send request to the api to REGISTER A USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(REGISTER_URL, formData);
      const { data } = response;

      if (response.status === 202) {
        //set the response for true
        setSuccess(true);
        //navigate the user to the login page
        navigate("/");
      }
    } catch (error) {
      //notify user if some error has occured
      alert("Email is not available.");
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p></p>
        </section>
      ) : (
        <section>
          <h1>Register</h1>
          <div className="register-page">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <br />
                <input
                  type="text"
                  id="username"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">Firstname:</label>
                <br />
                <input
                  type="text"
                  id="firstname"
                  placeholder="Enter Firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Lastname:</label>
                <br />
                <input
                  type="text"
                  id="lastname"
                  placeholder="Enter Lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <br />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
