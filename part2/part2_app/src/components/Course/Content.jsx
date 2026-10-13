import Part from "./Content/Part/Part";

const Content = (props) => (
  <div>
    {props.parts.map((item) => {
      return <Part key={item.id} part={item} />;
    })}
  </div>
);

export default Content;
