import React, { useEffect, useState } from "react";

const hasChildren = ({ node, nodes }) =>
  nodes.some((item) => item.parent_id === node.id);

const getChildren = ({ node, nodes }) =>
  nodes.filter((item) => item.parent_id === node.id);

const changeHandler = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }  

const submitHandler = (event) => {
    event.preventDefault()
    console.log(this.state)

    useEffect(() => {
      fetch("/nodes", {
        method: "POST",
        headers: new window.Headers({
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setNodes(data);
        });
    }, []);
  }

function Input(props) {
  console.log(props)
  console.log(Object.keys(props))
  return(
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            Parent
            <input type="text" name="parent" onChange={changeHandler} ></input>
          </div>
          <div>
            Child
            <input type="text" name="child" onChange={changeHandler} ></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}  

const Level = ({ nodes, parent }) => {
  const name = parent.last_name ? (
    <div className="name">
      {parent.first_name} {parent.last_name}
    </div>
  ) : null;

  if (!hasChildren({ nodes, node: parent })) {
    return name;
  }

  return (
    <>
      {name}
      <ul>
        {getChildren({ node: parent, nodes }).map((child) => (
          <li key={child.id}>
            <Level nodes={nodes} parent={child} />
          </li>
        ))}
      </ul>
    </>
  );
};

const App = () => {
  const [nodes, setNodes] = useState(null);
  useEffect(() => {
    fetch("/nodes", {
      method: "GET",
      headers: new window.Headers({
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json",
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setNodes(data);
      });
  }, []);

  return (
    <>
      <h1>Org Chart</h1>
      <Input parent_id="parent" child_id='child' ></Input>
      {nodes ? (
        <Level nodes={nodes} parent={nodes.find((node) => node.root)} />
      ) : (
        "loading..."
      )}
    </>
  );
};

export default App;
