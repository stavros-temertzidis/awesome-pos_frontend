import axios from "axios";
import jwt_decode from "jwt-decode";

// Api url preset
export const apiUrl = `http://localhost:3002/`;

// Register a user
export const register = async (newUser) => {
  try {
    const response = await axios.post(`${apiUrl}user/register`, newUser);
    if (response) {
      console.log("Registered");
    }
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data);
  }
};

// Login a user
export const login = async (user) => {
  try {
    const response = await axios.post(`${apiUrl}user/login`, user);
    // Save the token to localStorage
    localStorage.setItem("usertoken", response.data);
    // Save the user role to localStorage
    setUserRole();
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data);
  }
};

// Create a new category item
export const categoryCreate = async (categoryToCreate) => {
  try {
    const response = await axios.post(
      `${apiUrl}categories/add_category`,
      categoryToCreate,
      {
        headers: {
          "auth-token": localStorage.usertoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data);
  }
};

// Update the given category item
export const categoryUpdate = async (id, categoryToEdit) => {
  try {
    const response = await axios.put(
      `${apiUrl}categories/${id}`,
      categoryToEdit,
      {
        headers: {
          "auth-token": localStorage.usertoken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data);
  }
};

// Delete the given category item
export const categoryDelete = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}categories/${id}`, {
      headers: {
        "auth-token": localStorage.usertoken,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data);
  }
};

// Return the decoded token (if any)
export const getToken = () => {
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token);
  return decoded;
};

// Save the user role to localStorage
export const setUserRole = () => {
  const userRole = getToken();
  localStorage.setItem("userrole", userRole.user.role);
};

// User roles in database
export const userRoles = ["Admin", "Cashier"];
