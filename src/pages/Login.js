import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";

function Login({setUser}) {
    const navigate = useNavigate();

    const handleSuccess = () => {
        localStorage.setItem("loggedIn", "true");

        setUser(true);
        navigate("/");
    };

    return (
        <div className = "page">
            <h2>Login to StreamList</h2>

            <GoogleLogin onSuccess = {handleSuccess} onError = {() => console.log("Login Failed")}/>
        </div>
    );
}

export default Login;