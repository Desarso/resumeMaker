import { JSX, createSignal, onMount } from "solid-js";

type Props = {
  title: string;
  content: JSX.Element;
};

function Heading({ title, content }: Props) {
  const [id, _setId] = createSignal(generateRandomId());

  onMount(() => {
    let thisSection = document.getElementById(id());
    let height = thisSection?.offsetHeight;
    console.log(height);
    let border = thisSection?.querySelector(".border");
    border?.setAttribute("style", `height: ${height}px`);
  });

  return (
    <div class="section section-heading" id={id()}>
      <input class="heading" type="text" value={title} />
      <div class="content_holder">{content}</div>
      <div class="border"></div>
      <div class="ball"></div>
    </div>
  );
}

export default Heading;

export function generateRandomId() {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
