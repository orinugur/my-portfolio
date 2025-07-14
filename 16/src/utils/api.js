import axios from 'axios';

export async function fetchComments(videoId) {
  try {
    const res = await axios.get(`http://localhost:5000/api/comments?videoId=${videoId}`);
    return res.data.comments || [];
  } catch (err) {
    throw err;
  }
}