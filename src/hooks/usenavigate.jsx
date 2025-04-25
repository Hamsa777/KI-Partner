import { useNavigate } from "react-router-dom";

const DeinComponent = () => {
  const navigate = useNavigate();

  const handleAbschicken = () => {
    navigate("/demo-danke?service=email");
  };

  return <button onClick={handleAbschicken}>Abschicken</button>;
};
