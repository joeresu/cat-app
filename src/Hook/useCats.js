import { useSelector } from "react-redux";
import { useCatActions } from "./index";

const useCats = () => {

  const { breeds, items, selectedId } = useSelector(state => state.cats);

  return {
    actions: useCatActions(),
    hasMore: breeds.selectedId ? breeds.searchParams[breeds.selectedId].hasMore : false,
    cats: items,
    selectedCat: items[selectedId],
    catBreeds: breeds.cats,
    selectedBreedId: breeds.selectedId,
    breedOptions: breeds.options,
    isBreedOptionsLoaded: breeds.options.isLoaded,
  };
};

export default useCats;
