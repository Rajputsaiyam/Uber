import axios from "axios";

export const AddUser = async (user) => {
    try {
        const response = await axios.post("http://localhost:8000/authUser/sign-up", user);
        return response.data ;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error.response?.data || { message};
    }
};

export const LoginUser = async (user) => {
    
    try {
        const response = await axios.post("http://localhost:8000/authUser/sign-in", user);
        if (response.data?.token) {
            // Store the token in localStorage
            localStorage.setItem("authToken", response.data.token);
      
            console.log("Token successfully stored:", response.data.token);
          } else {
            console.error("No token received in response.");
          }
        return response.data.token;


    } catch (error) {
        console.error("Error during API call:", error);
        throw error.response?.data || { message: "Network error" };
    }
};