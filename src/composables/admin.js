import axios from "axios";

const signin = async (data) => {
  try {
    const response = await axios.post(
      "https://the-best-records-be.onrender.com/admins/signin",
      {
        username: data.username,
        password: data.password,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { signin };
