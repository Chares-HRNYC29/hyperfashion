/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const CompareModal = ({
  relatedItem,
  currentItem,
  closeModal,
  displayModal,
}) => {
   // combinedFeatures [[feature, currentItemFeatureVal, relatedItemFeatureVal], [feature, currentItemFeatureVal, ..]..]
  // if there is no such feature for currentItem or relatedItem. then the value = none
  const [combinedFeatures, setCombinedFeatures] = useState([]);

  const combineFeatures = (relatedProduct, currentProduct) => {
    const combined = new Set();
    const current = [];
    const related = [];
    if (currentProduct.features.length) {
      currentProduct.features.forEach((eachFeature) => {
        combined.add(eachFeature.feature);
        current.push(eachFeature.feature, eachFeature.value);
      });
    }
    if (relatedProduct[0].features.length) {
      relatedProduct[0].features.forEach((eachFeature) => {
        combined.add(eachFeature.feature);
        related.push(eachFeature.feature, eachFeature.value);
      });
    }
    const combinedFeatureArr = Array.from(combined).map((feature) => {
      let currentVal = 'none';
      let relatedVal = 'none';
      const curInd = current.indexOf(feature);
      const relInd = related.indexOf(feature);
      if (curInd > -1) {
        currentVal = current[curInd + 1];
      }
      if (relInd > -1) {
        relatedVal = related[relInd + 1];
      }
      return ([feature, currentVal, relatedVal]);
    });
    setCombinedFeatures(combinedFeatureArr);
  };

  const valueDisplay = (feature) => {
    if (feature[1] === 'none') {
      return ' ';
    }
    if (feature[1] === 'null') {
      return '✓';
    }
    return feature[1];
  };

  useEffect(() => {
    if (displayModal) {
      combineFeatures(relatedItem, currentItem);
    }
  }, [relatedItem]);


  return (
    <div>
      {displayModal ? (
        <div className="compareModal">
          <div className="modal-content">
            <span className="close" onClick={() => closeModal()}>
              &times;
            </span>
            <h5 className="compareModal-title-h5">Compare</h5>
            <table className="compareModal-table">
              <thead className="thead">
                <tr className="table-th-box">
                  <th>{currentItem.name}</th>
                  <th> </th>
                  <th>{relatedItem[0].name}</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {combinedFeatures.map((feature, i) => {
                  return (
                    <tr key={i} className="table-td-box">
                      <td name="curItemFeatureVal">
                        { valueDisplay(feature) }
                      </td>
                      <td name="features">{feature[0]}</td>
                      <td name="relItemFeatureVal">
                        { valueDisplay(feature) }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CompareModal;
