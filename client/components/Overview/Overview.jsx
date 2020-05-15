import { Avatar } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductDescription from "../../containers/OverviewContainers/productDescriptionContainer";
import Carousel from "../../containers/OverviewContainers/CarouselContainer";

const Overview = ({ productById }) => {
  const [styles, setStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});

  function getStyles() {
    let id = productById.id;
    let url = `http://18.224.200.47/products/${id}/styles`;
    return axios
      .get(url)
      .then((result) => {
        setStyles(result.data.results);
        setCurrentStyle(result.data.results[0]);
      })
      .catch((err) => {
        console.log("error getting styles", err);
      });
  }

  useEffect(() => {
    if (Object.keys(productById).length) {
      getStyles();
    }
  }, [productById]);

  return (
    <div>
      Style > {Object.values(currentStyle).length ? currentStyle.name : ""}
      {styles.map((style) => {
        const image = style.photos[0].thumbnail_url;
        return (
          <Avatar
            src={image}
            size="large"
            onClick={() => setCurrentStyle(style)}
          />
        );
      })}
      <Carousel currentStyle={currentStyle} />
      <ProductDescription />
    </div>
  );
};

export default Overview;
