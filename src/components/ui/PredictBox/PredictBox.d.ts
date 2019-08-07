export interface PredictBoxProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  boundingBoxes: any;
  formikBag: any;
  imageWidth: number;
  imageHeight: number;
}
