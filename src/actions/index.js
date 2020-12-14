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
    console.log("page from actions: ===>", page);
    return characters.data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};

export const getOneCharacter = async (id) => {
  try {
    const character = await Axios.get(`/character/${id}`);
    console.log("character from actions: ===>", character.data);
    return character.data;
  } catch (error) {
    const { data } = error.response;
    return data;
  }
};
