import axios from "axios";

const signin = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/admins/signin", {
      username: data.username,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { signin };
