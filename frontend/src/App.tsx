import { useState } from "react";
import axios from "axios";
import Button from "components/Button";

const App = () => {
  const [message, setMessage] = useState(null);
  axios.get("http://localhost:4000/api/top_pages").then(
    (res) => {
      const text = res.data.message;
      setMessage(text);
    },
    (err) => {
      console.log(err);
    }
  );

  return <Button>{message}</Button>;
};

export default App;
