import React, { useState, useEffect } from 'react';
import './App.css';
import { TaskRow } from "./components/TaskRow";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {

  const [showCompleted, setShowCompleted] = useState(true);

  const [userName, setUserName] = useState('Alvaro');
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null) {
      setTaskItems(JSON.parse(data));
    } else {
      setUserName("ejemplo");
      setTaskItems([
        { name: "task one from local Storage", done: false },
        { name: "task two local Storage", done: false },
        { name: "task three local Storage", done: true },
        { name: "task four local Storage", done: false },
      ])
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [taskItems]) //Repetir cada vez que taskItems cambie

  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }

  /*
  const taskTableRows = () => {
    return (taskItems.map(task => (
      <tr key={task.name}>
        <td>{task.name}</td>
      </tr>
    ))
    )
  } Toda esta funcion se pasara a Task Row
  */
  /*
    const taskTableRows = () => {
      return (
        taskItems.map(task => (
          <TaskRow task={task} />
        )))
    }*/

  const taskTableRows = (doneValue) =>
    taskItems.filter(task => task.done === doneValue).map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ))

  //Una manera abreviada  del anterior metodo. El return en funciones de flecha es inplicito.  

  const toggleTask = task => {
    setTaskItems(taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t))) //{...t, done: !t.done} Mantiene las otras tareas pero cambia done a su contrario. 
  }

  const borrarCompletos = () =>{
    setTaskItems(taskItems.filter(task=>task.done === false))
    
  }

  const reiniciarApp = () =>{
    localStorage.clear();
    window.location.reload(false);
  }



  return (
    <div className="App">
      <TaskBanner userName={userName} taskItems={taskItems} />

      <TaskCreator callback={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Realizado</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl
          description="Tareas copletas"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>

      {
        showCompleted && ( //If en una línea con operador lógico &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Descripcion</th>
                <th>Realizado</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }

      <div className="bg-secondary-text-white text-center p-2">
        <button className="btn btn-warning mt-1" onClick={borrarCompletos}>Vaciar completos</button>
        <button className="btn btn-danger mt-1" onClick={reiniciarApp}>reiniciar App</button>
      </div>

    </div>
  );
}

export default App;
