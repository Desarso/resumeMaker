import { Accessor, Setter } from "solid-js";
import Paragraph from "./Paragraph";

type Props = {
  value: string;
  data: Accessor<any>;
  setData: Setter<any>;
  className: string;
  paramsLocation: string;
};

function BulletPoint({
  value,
  data,
  setData,
  className,
  paramsLocation,
}: Props) {
  return (
    <ul>
      <li>
        <Paragraph
          value={value}
          data={data}
          setData={setData}
          className={`${className}`}
          paramsLocation={paramsLocation}
        />
      </li>
    </ul>
  );
}

export default BulletPoint;
