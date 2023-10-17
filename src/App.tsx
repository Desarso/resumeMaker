import { For, createSignal, onMount } from "solid-js";
import "./styles.css";
import jsonResume from "./info.json";
import Heading from "./modules/Heading";
import Input from "./modules/Input";
import BulletPoint from "./modules/BulletPoint";
import Paragraph from "./modules/Paragraph";
import EducationSection from "./modules/EducationSection";
import JobsSection from "./modules/JobsSection";

export class ResumeFetcherNSetter {
  static async fetchResume() {
    try {
      let result = await fetch(
        "https://server.gabrielmalek.com/v1/api/getResume"
      )
        .then((res) => res.json())
        .then((data) => {
          window.localStorage.setItem("resumeData", JSON.stringify(data));
          return data;
        });
      return result;
    } catch (e) {
      console.log("error fetching from database");
      //let get it from local storage
      let data = window.localStorage.getItem("resumeData");
      if (data) {
        console.log("data from local storage");
        return JSON.parse(data);
      } else {
        console.log("defualt data");
        return jsonResume;
      }
    }
  }

  static setResume(data: any) {
    window.localStorage.setItem("resumeData", JSON.stringify(data));
    //send post request to server
    fetch("https://server.gabrielmalek.com/v1/api/saveResume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}

function App() {
  let normal = jsonResume;
  const [data, setData] = createSignal(normal);
  // const [eidtable, setEditable] = createSignal(false);
  onMount(async () => {
    let newData = await ResumeFetcherNSetter.fetchResume();
    console.log(newData);
    setData(newData);
  });

  return (
    <div class="document" data-docskinwidth="630">
      <div class="section">
        <Input
          value={"name"}
          data={data}
          setData={setData}
          className={"name"}
          paramsLocation=""
        />
        <Input
          value={"lastName"}
          data={data}
          setData={setData}
          className={"lastName"}
          paramsLocation=""
        />
      </div>
      <div class="section contact-info">
        <span class="contact-info span">
          <Input
            value={"email"}
            data={data}
            setData={setData}
            className={"contact-info email"}
            paramsLocation=""
          />{" "}
          |
          <Input
            value={"phoneNumber"}
            data={data}
            setData={setData}
            className={"contact-info"}
            paramsLocation=""
          />{" "}
        </span>
        <Input
          value="address"
          data={data}
          setData={setData}
          className={"contact-info"}
          paramsLocation=""
        />
      </div>

      <Heading
        title={"portafolio website"}
        content={
          <BulletPoint
            value={"PortafolioWebsite"}
            data={data}
            setData={setData}
            className={"PortafolioWebsite"}
            paramsLocation=""
          />
        }
      />
      <Heading
        title={"PROFESSIONAL SUMMARY"}
        content={
          <div class="paragraph">
            <Paragraph
              value={"ProfessionalSummary"}
              data={data}
              setData={setData}
              className={"ProfessionalSummary"}
              paramsLocation=""
            />
          </div>
        }
      />

      <Heading
        title={"Education"}
        content={
          <EducationSection
            value={"Education"}
            data={data}
            setData={setData}
            className={"Education"}
          />
        }
      />
      <Heading
        title={"Skills"}
        content={
          <div class="inlineContent">
            <span>
              <For each={normal.skills.firstRow}>
                {(_item, i) => {
                  return (
                    <BulletPoint
                      value={`${i()}`}
                      data={data}
                      setData={setData}
                      paramsLocation={"skills.firstRow"}
                      className={"skill"}
                    />
                  );
                }}
              </For>
            </span>
            <span>
              <For each={normal.skills.secondRow}>
                {(_item: any, i) => {
                  return (
                    <BulletPoint
                      value={`${i()}`}
                      data={data}
                      setData={setData}
                      className={"skill"}
                      paramsLocation={"skills.secondRow"}
                    />
                  );
                }}
              </For>
            </span>
          </div>
        }
      />

      <Heading
        title={"Professional Experience"}
        content={
          <JobsSection
            data={data}
            setData={setData}
            value={"professionalExperience"}
          />
        }
      />
    </div>
  );
}

export default App;
