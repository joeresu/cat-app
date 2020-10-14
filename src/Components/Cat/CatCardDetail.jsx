import React, { useEffect } from "react";
import { useParams, withRouter } from 'react-router-dom';
import { Button, Card, CardImg, Container } from "react-bootstrap";
import { useCats } from "../../Hook";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  margin: 1rem auto;
`;

const CatCardDetail = (props) => {

  const { className = '' } = props;

  const params = useParams();

  const { selectedCat, actions: {selectCatId, selectBreedId, fetchCatById} } = useCats();

  const handleBackClick = () => {
    selectBreedId(selectedCat.breed.id);
    props.history.push('/');
  };

  useEffect(() => {
    if(!selectedCat) {
      fetchCatById(params.catId);
      selectCatId(params.catId);
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StyledContainer
    className={`cat-card-detail ${className}`}>
    {
      selectedCat &&
      <Card>
        <div className={`card-header`}>
          <Button onClick={handleBackClick}>Back</Button>
        </div>
        <CardImg src={selectedCat.url}></CardImg>
        {
          selectedCat.breed &&
          <div className={`card-body`}>
            <h4>{selectedCat.breed.name}</h4>
            <h5>Origin: {selectedCat.breed.origin}</h5>
            <h6>{selectedCat.breed.temparament}</h6>
            <p>{selectedCat.breed.description}</p>
          </div>
        }
        <div className="card-header">
          <Button onClick={handleBackClick}>Back</Button>
        </div>
      </Card>
    }
  </StyledContainer>;
};

export default withRouter(React.memo(CatCardDetail));
