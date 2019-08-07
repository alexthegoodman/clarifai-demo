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
  return (
    boundingBoxes ? 
    <div className="predictBox">
      {boundingBoxes.map((data, i) => {
        const box = data.region_info.bounding_box;
        // bounding box is decimal percentages
        return <div key={i} style={{ 
          border: "2px red solid", 
          position: "absolute", 
          top: (box.top_row * 100) + "%",
          left: (box.left_col * 100) + "%",
          width: ((box.right_col - box.left_col) * 100) + "%",
          height: ((box.bottom_row - box.top_row) * 100) + "%"
         }}></div>
      })}
      <img className="displayImage" src={formikBag.values["facesData"]} />
    </div>
    : <></>
  );
};

export default PredictBox;
