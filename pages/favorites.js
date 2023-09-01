import FavouritesList from '../components/FavoritesList';
import { useSelector } from 'react-redux';

const FavouritesPage = () => {
  const favourites = useSelector((state) => state.favourites);

  return (
    <div>
      <h1>Your Favourites</h1>
      <FavouritesList favourites={favourites} />
    </div>
  );
};

export default FavouritesPage;
