import * as React from "react";

import { PredictBoxProps } from "./PredictBox.d";

const PredictBox: React.FC<PredictBoxProps> = ({
  ref = null,
  className = "",
  onClick = e => console.info("Click"),
  boundingBoxes = null,
  formikBag = null,
  imageHeight = 0,
  imageWidth = 0
}) => {
  console.info(boundingBoxes, imageHeight, imageWidth)
  return (
    boundingBoxes ? 
    <div className="predictBox">
      {boundingBoxes.map((data, i) => {
        const box = data.region_info.bounding_box;
        console.info(box);
        return <div key={i} style={{ 
          border: "2px red solid", 
          position: "absolute", 
          top: box.top_row * imageHeight,
          left: box.left_col * imageWidth,
          width: imageWidth - (box.right_col * imageWidth),
          height: imageHeight - (box.bottom_row * imageHeight)
         }}></div>
      })}
      <img className="displayImage" src={formikBag.values["facesData"]} />
    </div>
    : <></>
  );
};

export default PredictBox;
