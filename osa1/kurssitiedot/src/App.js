const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return <p>{props.text}</p>;
};

const Content = (props) => {
  return (
    <div>
      <Part text={props.part1} />
      <Part text={props.part2} />
      <Part text={props.part3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <>
      <Header course={course} />
      <Content
        part1={part1 + " " + exercises1}
        part2={part2 + " " + exercises2}
        part3={part3 + " " + exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  );
};

export default App;
