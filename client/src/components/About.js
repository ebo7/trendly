import { Link } from "react-router-dom";
import Header from "./Header/Header";

const About = () => {
  return (
    <div>
      <Header />
      <h4>Version 0.2</h4>
      <Link to="/" className="link">
        Go Back
      </Link>
    </div>
  );
};

export default About;
