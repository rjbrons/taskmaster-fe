// import React from 'react';
// import logo from './logo.svg';
// import './app.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/app.js</code> and save to reload Stuff.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

    
import React, {useState, useEffect} from 'react';
import './app.scss';

const API = 'http://taskmaster-env.txmi2mw3a9.us-east-2.elasticbeanstalk.com/tasks'

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const _getTasks = () => {
    // fetch from deployed backend
    fetch( API, {
      mode:'cors',
    })
    .then( data => data.json() )
    .then( tasks => setTasks(tasks) )
    .catch( console.error );

  };

  useEffect(_getTasks, []);

  return (
    <ul>
      {tasks.map( (task) =>
        <li className={`-${task.title}`} key={task.id}>
          <details>
            <Details task={task} />
          </details>
        </li>
      )}
    </ul>
  )
}

function Details(props) {
  let task = props.task || {};
  return (

    <section>
        <div>
          <span>{task.title}</span>
          <span>{task.description}</span>
          <span>{task.status}</span>
          <span>{task.assignee}</span>
        </div>
    </section>

  )
}

function App() {
  return (
    <>
      <header>Welcome to the Task Master App</header>
      <main>
        <Tasks />
      </main>
      <footer>The End</footer>
     </>
  );
}

export default App;
