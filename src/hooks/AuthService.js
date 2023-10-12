import axios from "../api/axios";
const LOGIN_URL = "/sign-in";
const AuthService = {
  login: async (credentials) => {
    const response = await axios.post(LOGIN_URL, credentials);

    if (response.data) {
      localStorage.setItem("token", response.data.accessToken);
    }

    return response;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
  isAuthenticated: () => {
    // Check if the user is authenticated (for example, check the presence of a token)
    
    const token = localStorage.getItem("token");
    console.log(token);

    return token ? true : false;
  },
};

export default AuthService;
