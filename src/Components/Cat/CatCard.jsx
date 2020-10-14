import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { useCats } from "../../Hook";
import LazyLoad from 'react-lazy-load';

const CatCard = (props) => {

  const { className = '', cat } = props;

  const { actions: { selectCatId } } = useCats();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleContentVisible = () => {
    setIsImageLoading(false);
  }

  const onViewDetails = () => {
    selectCatId(cat.id);
    props.history.push(`/${cat.id}`);
  };

  return <Card className={`cat-card ${className}`}>
    <LazyLoad onContentVisible={handleContentVisible}>
      <img className={`card-img-top ${isImageLoading ? "img-loading" : "img-loaded"}`} src={cat.url} alt={cat.breed.name}/>
    </LazyLoad>
    <div className="card-body">
      <Button className="btn btn-primary btn-block" onClick={onViewDetails}>View Details</Button>
    </div>
  </Card>;
};

export default withRouter(React.memo(CatCard));
