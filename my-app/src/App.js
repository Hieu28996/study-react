import logo from './logo.svg';
import Button from './Components/Button';
import Input from './Components/Input';
import './App.css';

function App() {
  // const Data = [
  //   {
  //     type
  //   }
  // ]

  return (
    <div className="App">
      <Button 
        type='button' 
        color='blue' 
        size='small' 
      />
      <Button  
        color='red' 
        href='http://hivelabvina.dreamstation.vn/login?returnUrl=%2Fmain' 
      />
      <Input 
        id='input-text' 
        type='checkbox' 
        value='text' 
        checked 
      />
    </div>
  );
}

export default App;
