import { Accessor, For, Setter } from "solid-js";
import Paragraph from "./Paragraph";

type Props = {
  value: string;
  data: Accessor<any>;
  setData: Setter<any>;
  className: string;
};

function EducationSection({ data, setData }: Props) {
  return (
    <div>
      <For each={data().Education}>
        {(_item: any, i) => {
          return (
            <>
              <div class="basicText flex">
                <span contentEditable={true}>
                  <Paragraph
                    value={"name"}
                    data={data}
                    setData={setData}
                    paramsLocation={`Education.${i()}`}
                    className={"basicText"}
                  />
                </span>
                <span>&nbsp - </span>
                <span contentEditable={true}>
                  <Paragraph
                    value={"location"}
                    data={data}
                    setData={setData}
                    paramsLocation={`Education.${i()}`}
                    className={"basicText"}
                  />
                </span>
                <span contentEditable={true} class="italic">
                  &nbsp&nbsp
                  <Paragraph
                    value={"graduationDate"}
                    data={data}
                    setData={setData}
                    paramsLocation={`Education.${i()}`}
                    className={"basicText"}
                  />
                </span>
              </div>

              <div class="paragraph flex">
                <Paragraph
                  value={"degreeType"}
                  data={data}
                  setData={setData}
                  paramsLocation={`Education.${i()}`}
                  className={"degreeType"}
                />
                {": "}&nbsp
                {/* <span contentEditable={true}>&nbsp{item.major}</span> */}
                <Paragraph
                  value={"major"}
                  data={data}
                  setData={setData}
                  paramsLocation={`Education.${i()}`}
                  className={"basicText"}
                />
              </div>
              <Paragraph
                value={"summary"}
                data={data}
                setData={setData}
                paramsLocation={`Education.${i()}`}
                className={"summary"}
              />
            </>
          );
        }}
      </For>
    </div>
  );
}

export default EducationSection;
