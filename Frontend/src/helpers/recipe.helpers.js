import { auth } from './auth.helpers';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/';
const API_KEY = 'ef885b0f2a2d478b9d1375a6563edefa';

async function getAll() {
  try {
    const res = await axios.get(`${baseUrl}user/getAll`, auth());
    console.log(res.data);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllLiked() {
  try {
    const res = await axios.get(`${baseUrl}user/getAllLiked`, auth());
    console.log(res.data);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}
async function search({ author = '', genre = '', keywords = '' }) {
  try {
    const res = await axios.get(
      `${baseUrl}book/search/?author=${author}&genre=${genre}&keywords=${keywords}`,
      auth()
    );
    console.log(res);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function getMeasurements() {
  try {
    const res = await axios.get(`${baseUrl}recipe/getMeasurements`, auth());
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function addPost(data) {
  try {
    const res = await axios.post(`${baseUrl}user/post/`, data, auth());
    console.log(res);
    const post = res.data;
    return { post };
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

async function getIngredient(query, number = 5) {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=${number}&apiKey=${API_KEY}`
    );
    return res.data;
  } catch (error) {}
}

export { getAll, search, getAllLiked, addPost, getMeasurements, getIngredient };
