import React, {useState} from './react_clone';
import logo from './logo.svg';
import './App.css';

const users = ['BallEhz', 'Den_dp', 'trixms'];

function Test() {
    const [counter, setCounter] = useState(0);
    return <div onClick={() => setCounter(counter + 1)}>{counter}</div>;
}

function App() {
  const [counter, setCounter] = useState(0);
  const [secondCounter, setSecondCounter] = useState(0);
  return <div className="App">
        <Test />
        {users.map(user => <p>{user}</p>)}
        <p onClick={() => setCounter(counter + 1)}>{counter}</p>
        <p onClick={() => setSecondCounter(secondCounter + 1)}>{secondCounter}</p>
    </div>;
}

export default App;
