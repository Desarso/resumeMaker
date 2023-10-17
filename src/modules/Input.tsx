import { Accessor, Setter } from "solid-js";
import { ResumeFetcherNSetter } from "../App";

type Props = {
  value: string;
  data: Accessor<any>;
  setData: Setter<any>;
  className: string;
  paramsLocation: string;
};

function Input({ value, data, setData, className }: Props) {
  return (
    <input
      type="text"
      class={className}
      value={data()[value]}
      onChange={(e) => {
        let newData = data();
        newData[value] = e.target.value;
        ResumeFetcherNSetter.setResume(newData);
        setData(newData);
      }}
    />
  );
}

export default Input;
