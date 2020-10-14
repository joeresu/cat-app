import {
  getBreeds,
  getCatById,
  getCatsByBreedId,
  setSelectedBreedId,
  setSelectedCatId
} from "../Redux/Actions/catActions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

const useCatActions = () => {

  const dispatch = useDispatch();

  const { breeds } = useSelector(state => state.cats);

  const fetchBreeds = useCallback((callback = () => {}) => {
    dispatch(
      getBreeds(callback)
    )
  }, [dispatch]);

  const fetchCatById = useCallback((id, callback = () => {}) => {
    dispatch(
      getCatById({id}, callback)
    )
  }, [dispatch]);

  const fetchMoreBreeds = useCallback((breedId, callback = () => {}) => {
    if(breeds.searchParams[breedId].hasMore) {
      dispatch(
        getCatsByBreedId({
          breed_id: breedId,
          limit: breeds.searchItems,
          page: breeds.searchParams[breedId].page
        }, callback)
      )
    }
  }, [breeds, dispatch]);

  const selectBreedId = useCallback((id, callback = () => {}) => {
    dispatch(
      setSelectedBreedId({id})
    )
  }, [dispatch]);

  const selectCatId = useCallback((id, callback = () => {}) => {
    dispatch(
      setSelectedCatId({id})
    )
  }, [dispatch])

  return {
    selectCatId,
    selectBreedId,
    fetchBreeds,
    fetchCatById,
    fetchMoreBreeds
  };
};

export default useCatActions;
