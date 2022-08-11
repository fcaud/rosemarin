import { recipeCache } from '../data';
import { Instruction, Recipe, Section, Tag } from '../Types';

// const headers = {
//   'X-RapidAPI-Key': '20d2d622c5mshefaea8f4fc1579fp145ccbjsn1662f35c8e98',
//   'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
// };
// const baseURL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20';

export const getRandomRecipe = (tag = null) => {
  // const tagURL = '';
  // if (tag) tagURL = `&tags=${tag}`;

  // const options = {
  //   method: 'GET',
  //   headers: headers,
  // };
  // return await fetch(`${baseURL}${tagURL}`, options)
  // 	.then(response => response.json())
  // 	.catch(err => console.error(err));

  const recipes = recipeCache;

  const res: Recipe[] = recipes.reduce((acc: Recipe[], recipe) => {
    acc = [
      ...acc,
      {
        name: recipe.name,
        thumbnail_url: recipe.thumbnail_url,
        description: recipe.description as string,
        sections: recipe.sections as Section[] | [],
        instructions: recipe.instructions as Instruction[],
        renditions: recipe.renditions,
        id: recipe.id,
        tags: recipe.tags,
      },
    ];
    return acc;
  }, []);

  return tag
    ? res.filter((recipe) =>
        recipe.tags!.some((recipeTag: Tag) => recipeTag.name === tag)
      )
    : res;
};
