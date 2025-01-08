import './App.css';
import TodoList from './Components/TodoList/TodoList';

function App() {
  return (
    <div className='bg-gray-900 screen flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold text-white mb-5'>Todo App</h1>
      <TodoList/>
     
    </div>
  );
}

export default App;
