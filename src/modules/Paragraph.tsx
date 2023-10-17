import { Accessor, Setter, createSignal, onMount } from "solid-js";
import { generateRandomId } from "./Heading";
import { ResumeFetcherNSetter } from "../App";

type Props = {
  value: string;
  data: Accessor<any>;
  setData: Setter<any>;
  className: string;
  paramsLocation: string;
};

function Paragraph({ value, data, setData, className, paramsLocation }: Props) {
  const dataProxy = createDataProxy(data);

  let content: string =
    paramsLocation !== "" ? dataProxy[paramsLocation][value] : data()[value];
  const [id, _setId] = createSignal(generateRandomId());

  onMount(() => {
    document.getElementById(id())?.addEventListener("input", (e) => {
      const dataProxy = createDataProxy(data);
      let newData = dataProxy;
      if (paramsLocation !== "") {
        newData[paramsLocation][value] = (e?.target as HTMLElement)?.innerText;
        setData(newData);
        ResumeFetcherNSetter.setResume(newData);
      } else {
        let newData = data();
        newData[value] = (e?.target as HTMLElement)?.innerText;
        setData(JSON.parse(JSON.stringify(newData)));
        ResumeFetcherNSetter.setResume(newData);
      }
    });

    // if (paramsLocation !== "") {
    //   console.log(paramsLocation);
    //   console.log(value);
    //   console.log(dataProxy[paramsLocation]);
    //   console.log(dataProxy[paramsLocation][value]);
    // }
  });

  return (
    <div class={`${className} paragraph`} id={id()} contenteditable={true}>
      {content}
    </div>
  );
}

export default Paragraph;

function createDataProxy(data: any) {
  return new Proxy(data(), {
    get(target, key) {
      if (typeof key !== "string") {
        return undefined;
      }
      const keys = key.toString().split(".");
      let value = target;
      for (const k of keys) {
        if (typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return undefined;
        }
      }
      return value;
    },
    set(target, key, newValue) {
      if (typeof key !== "string") {
        return undefined;
      }
      const keys = key.split(".");
      let obj = target;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in obj)) {
          obj[k] = {};
        }
        obj = obj[k];
      }
      obj[keys[keys.length - 1]] = newValue;
      return true;
    },
  });
}
