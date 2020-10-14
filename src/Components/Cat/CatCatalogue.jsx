import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Col, Container, FormGroup, FormLabel, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import CatCard from "./CatCard";
import { useCats } from "../../Hook";

const CatCatalogue = (props) => {

  const { className = "" } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { hasMore, selectedBreedId, breedOptions, cats, catBreeds,
    actions: {fetchBreeds, fetchMoreBreeds, selectBreedId}
  } = useCats();

  const handleSelectBreed = (e) => {
    selectBreedId(e.target.value);
  };

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    fetchMoreBreeds(selectedBreedId, () => {
      setIsLoading(false);
    });
  }, [fetchMoreBreeds, selectedBreedId]);

  useEffect(() => {
    if(selectedBreedId && catBreeds[selectedBreedId].length === 0) {
      handleLoadMore();
    }
  }, [selectedBreedId, catBreeds, handleLoadMore]);

  useEffect(() => {
    setIsLoading(true);
    fetchBreeds(() => {
      setIsLoading(false);
    });

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Container className={`cat-catalogue ${className}`}>
    <h1>Cat Browser</h1>
    <Row>
      <Col className={`col-md-3 col-sm-6 col-12`}>
        <FormGroup>
          <FormLabel>Breed</FormLabel>
          <select
            value={selectedBreedId} onChange={handleSelectBreed}
            className={`form-control`}>
            <option value={''}>Select Breed</option>
            {
              breedOptions.map(b => {
                return <option key={b.id} value={b.id}>{b.name}</option>;
              })
            }
          </select>
        </FormGroup>
      </Col>
    </Row>
    {
      isLoading &&
      <span className={'spinner-border spinner-border-sm text-primary mr-2'}/>
    }
    {
      selectedBreedId && catBreeds[selectedBreedId] &&
      <Row className={`row-equal-height`}>
        {
          catBreeds[selectedBreedId].map(cid => {
            return <Col key={cats[cid].id} className={`col-md-3 col-sm-6 col-12 mb-4`}>
              <CatCard cat={cats[cid]}/>
            </Col>;
          })
        }
      </Row>
    }
    {
      hasMore && catBreeds[selectedBreedId].length >= 1 &&
      <Row className="mt-4">
        <Col>
          <Button onClick={handleLoadMore} className={`btn btn-success d-flex justify-content-center align-items-center`}>
            {
              isLoading &&
              <span className={'spinner-border spinner-border-sm text-light mr-2'}/>
            }
            Load More</Button>
        </Col>
      </Row>
    }
  </Container>;
};

const { string } = PropTypes;

CatCatalogue.propTypes = {
  className: string
};

export default withRouter(CatCatalogue);
