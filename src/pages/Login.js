import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Pages.css";

function Login({ setUser }) {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decodedUser = jwtDecode(credentialResponse.credential);

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("streamlist-user", JSON.stringify(decodedUser));

    setUser(true);
    navigate("/");
  };

  return (
    <div className="page">
      <h2>Login to StreamList</h2>
      <p>Please sign in with Google to access the application.</p>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
}

export default Login;