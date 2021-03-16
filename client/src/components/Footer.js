import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <br />

      <br />
      <Link to="/about" style={{ color: "black" }}>
        About
      </Link>
      <br />

      {"Copyright © "}
      {new Date().getFullYear()}
    </>
  );
};
export default Footer;
