import Part from "./Content/Part/Part";

const Content = (props) => (
  <div>
    {props.parts.map((item, i) => {
      return <Part key={i} part={item} />;
    })}
  </div>
);

export default Content;
