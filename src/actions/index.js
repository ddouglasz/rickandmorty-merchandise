import { Axios } from "../utils/axioseConfig";

export const searchRickAndMortyCharacters = async (
  name,
  status,
  species,
  type,
  gender
) => {
  try {
    const characters = await Axios.get(
      `/character/?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`,
      {
        name,
        status,
        species,
        type,
        gender,
      }
    );
    console.log("from actions: ===", {
      name,
      status,
      species,
      type,
      gender,
    });
    return characters.data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getAllCharacters = async (page) => {
  try {
    const characters = await Axios.get(`/character/?page=${page}`, {
      page,
    });
    return characters.data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getOneCharacter = async (id) => {
  try {
    const character = await Axios.get(`/character/${id}`);
    let arr = [];
    character.data.episode.forEach((url) => {
      arr.push(url.split("/")[url.split("/").length - 1]); //take the last string of the url for multile array call
    });
    const { data } = character;
    const episodesOfCharacter = await Axios.get(`/episode/${arr}`);
    return { data, episodesOfCharacter };
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
