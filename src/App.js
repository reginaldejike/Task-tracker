import Header from './components/Header';
import Tasks from './components/Tasks';
import React from 'react';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import { useState, useEffect } from 'react';

function App() {
  const [showAddtask, setShowAddTask] = useState(true);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };
    getTasks();
  }, []);

  //fetch tasks

  const fetchTasks = async () => {
    const res = await fetch(
      'https://my-json-server.typicode.com/pizzii/Task/tasks'
    );
    const data = await res.json();
    return data;
  };
  //fetch task
  const fetchTask = async (id) => {
    const res = await fetch(
      `https://my-json-server.typicode.com/pizzii/Task/tasks/${id}`
    );
    const data = await res.json();
    return data;
  };
  // Add Task
  const addTask = async (task) => {
    const res = await fetch(
      'https://my-json-server.typicode.com/pizzii/Task/tasks',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      }
    );
    const data = await res.json();

    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };
  //Delete task
  const deleteTask = async (id) => {
    await fetch(`https://my-json-server.typicode.com/pizzii/Task/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(
      `https://my-json-server.typicode.com/pizzii/Task/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      }
    );

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };
  return (
    <BrowserRouter>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddtask)}
          showAdd={showAddtask}
        />

        <Routes>
          <Route
            path='/Task-tracker'
            element={
              <>
                {showAddtask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Available Task'
                )}
              </>
            }
          />
          <Route path='/Task-tracker/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
