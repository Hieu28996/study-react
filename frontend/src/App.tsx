import { useState } from "react";
import axios from "axios";
import Button from "components/Button";

const App = () => {
  const [message, setMessage] = useState(null);
  axios.get("http://localhost:4000/api/test/all").then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );

  return <Button>1231</Button>;
};

export default App;
