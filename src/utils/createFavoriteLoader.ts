import DataLoader from "dataloader";
import { Favorite } from "../entities/Favorite";

export const createFavoriteLoader = () =>
  new DataLoader<string, Favorite>(async (postIds) => {
    const favorites = await Favorite.findByIds(postIds as string[]);
    const postIdsToFavorite: Record<string, Favorite> = {};
    favorites.forEach((favorite) => {
      postIdsToFavorite[favorite.postId] = favorite;
    });

    const sortedFavorites = postIds.map(
      (postIds) => postIdsToFavorite[postIds]
    );
    return sortedFavorites;
  });
