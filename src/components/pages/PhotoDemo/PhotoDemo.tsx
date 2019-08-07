import * as React from "react";

import { PhotoDemoProps, PhotoDemoValues } from "./PhotoDemo.d";
import ClarifaiClient from "../../../services/ClarifaiClient";
import { Button, Text } from "@blueprintjs/core";
import { Formik, FormikActions, Form, FormikProps } from "formik";
import UploadField from "../../ui/UploadField/UploadField";
import * as Yup from "yup";
import PredictBox from "../../ui/PredictBox/PredictBox";

const PhotoDemo: React.FC<PhotoDemoProps> = () => {
  const clarifaiClient = new ClarifaiClient();

  const [boundingBoxes, setBoundingBoxes] = React.useState(null);

  const PhotoDemoSchema = Yup.object().shape({
    faces: Yup.string()
      .required("Required"),
  });

  return (
    <>
    <Text tagName="h1" className="headline">
        Photo Demo
      </Text>
      <Text tagName="p">Only 1 image at a time.</Text>

      {/* {notValidType ? (
        <Callout title="Attention" intent="danger">
          Your user is not a valid type. Please contact support.
        </Callout>
      ) : (
        <></>
      )} */}

      <Formik
        initialValues={{ faces: "" }}
        validationSchema={PhotoDemoSchema}
        onSubmit={async (
          values: PhotoDemoValues,
          actions: FormikActions<PhotoDemoValues>
        ) => {
          console.log("values", { values, actions });

          // mixpanel.track("Log in form submission attempt", {
          //   env: process.env.NODE_ENV,
          //   time: new Date(),
          //   data: {
          //     values,
          //   },
          // });

          const dataBoundingBoxes = await clarifaiClient.getFaceBoundingBox(values["facesData"]);
          setBoundingBoxes(dataBoundingBoxes);
        }}
        render={(formikBag: FormikProps<PhotoDemoValues>) => {
          return (
            <Form>
              <UploadField label="Upload Faces" fieldName="faces" />
              <img className="displayImage" src={formikBag.values["facesData"]} />
              <Button
                type="submit"
                disabled={formikBag.isSubmitting}
                loading={formikBag.isSubmitting}
              >
                Predict
              </Button>
              <Text tagName="p">Face Bounding Box:</Text>
              <PredictBox boundingBoxes={boundingBoxes} formikBag={formikBag} imageWidth={formikBag.values["facesWidth"]} imageHeight={formikBag.values["facesHeight"]} /> 
            </Form>
          );
        }}
      />
    </>
  ); 
};

export default PhotoDemo;
