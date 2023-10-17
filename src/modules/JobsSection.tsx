import { Accessor, For, Setter } from "solid-js";
import BulletPoint from "./BulletPoint";

type Props = {
  value: string;
  data: Accessor<any>;
  setData: Setter<any>;
};

function JobsSection({ setData, data }: Props) {
  return (
    <div>
      <For each={data().professionalExperience}>
        {(item: any, i) => {
          return (
            <>
              <div class="basicText">
                <span contentEditable={true} class="degreeType">
                  {" "}
                  {item.Title}
                </span>
                <span>&nbsp;|&nbsp;</span>
                <span contentEditable={true}>{item.Company}</span>
                <span contentEditable={true} class="italic">
                  &nbsp;-&nbsp;{item.Location}{" "}
                </span>
                <div contentEditable={true} class="italic">
                  &nbsp;&nbsp;{item.StartDate} - {item.EndDate}
                </div>
              </div>
              <For each={item.bulletPoints}>
                {(_other: any, j) => {
                  return (
                    <div class="jobBullets">
                      <BulletPoint
                        value={`${j()}`}
                        data={data}
                        setData={setData}
                        className={"bulletPoint"}
                        paramsLocation={`professionalExperience.${i()}.bulletPoints`}
                      />
                    </div>
                  );
                }}
              </For>
            </>
          );
        }}
      </For>
    </div>
  );
}

export default JobsSection;
