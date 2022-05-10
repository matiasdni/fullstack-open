const Header = (props) => {
  console.log(props);
  return <h1>{props.course.name}</h1>;
};

const Part = (props) => {
  console.log(props);
  return (
    <p>
      {props.text.name} {props.text.exercises}
    </p>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part text={props.parts.parts[0]} />
      <Part text={props.parts.parts[1]} />
      <Part text={props.parts.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  let sum = 0;
  props.parts.parts.forEach((element) => {
    sum += element.exercises;
  });
  return <p>Number of exercises {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

export default App;
