import './App.css';
import Todo from './Todo';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from "react-helmet";

function App() {
  return (
    <>
 <Helmet>
                <meta charSet="utf-8" />
                <title> TODO single Page Application</title>
                <meta name="ToDo List " content="Crud application" />
              
            </Helmet>

     <Todo/>
    </>
  );
}

export default App;
