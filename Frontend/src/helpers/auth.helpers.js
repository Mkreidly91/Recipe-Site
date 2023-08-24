import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/';

const auth = () => {
  const { token } = JSON.parse(localStorage.getItem('userInfo'));
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const getUser = () => {
  const { user } = JSON.parse(localStorage.getItem('userInfo'));
  return user;
};

async function logIn({ email, password }) {
  try {
    const res = await axios.post(`${baseUrl}login`, {
      email,
      password,
    });
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
    const {
      response: {
        data: { message, errors },
      },
    } = error;

    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}
async function register({ name, email, password }) {
  try {
    const res = await axios.post(`${baseUrl}register`, {
      name,
      email,
      password,
    });
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
    const {
      response: {
        data: { message, errors },
      },
    } = error;

    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}

async function logOut() {
  try {
    const res = await axios.post(`${baseUrl}/logout`, undefined, auth());
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
    const {
      response: {
        data: { message, errors },
      },
    } = error;

    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}

export { logIn, auth, logOut, register, getUser };
