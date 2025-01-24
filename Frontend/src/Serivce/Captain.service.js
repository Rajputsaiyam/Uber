import axios from "axios";

export const AddCaptain = async (captain) => {
    try {
        const response = await axios.post("http://localhost:8000/autCaptain/sign-up", captain);
        return response.data ;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error.response?.data || { message: "An error occurred" };
    }
};

export const LoginCaptain = async (captain) => {
    
    try {
        const response = await axios.post("http://localhost:8000/authCaptain/sign-in", captain);
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