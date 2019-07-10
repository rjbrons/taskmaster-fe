    
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
          <span><AddImage id={task.id}/></span>
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
class AddImage extends React.Component{
 render(){
   return(
     <form action={`${API}/${this.props.id}/images`} method="post" encType="multipart/form-data">
       <input name="file" type="file"></input>
       <input name="submit" type="submit"></input>
     </form>
   )
 }
}

export default App;
