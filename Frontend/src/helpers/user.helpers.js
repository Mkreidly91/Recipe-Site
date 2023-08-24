import { auth } from './auth.helpers';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/';

async function getAllFollowed() {
  try {
    const res = await axios.get(`${baseUrl}user/getAllFollowed`, auth());
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

async function postComment({ comment, recipeId }) {
  try {
    const res = await axios.post(
      `${baseUrl}user/comment`,
      {
        comment,
        recipeId,
      },
      auth()
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function likeRecipe(recipeId) {
  try {
    const res = await axios.post(`${baseUrl}user/like/`, { recipeId }, auth());
  } catch (error) {
    console.log(error);
  }
}

async function addPost(data) {
  try {
    const res = await axios.post(`${baseUrl}recipe/addRecipe`, data, auth());
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

export {
  getAllFollowed,
  postComment,
  likeRecipe,
  search,
  getAllLiked,
  addPost,
};
