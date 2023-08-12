// Toastify message
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// React Router Dom
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Components
import Layout from './Components/Layout';
import { TodoListInputFormAction } from './Components/TodoListInputForm';

// Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    action: TodoListInputFormAction,
    children:[
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
