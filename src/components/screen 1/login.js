import logo from "../../assets/logo.PNG";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <>
            <div className="loginScreen">
                <div className="loginLogo">
                    <img src={logo}></img>
                    <h1>TrackIt</h1>
                </div>
                <div className="loginForm">
                    <form>
                        <input placeholder="e-mail"></input>
                        <input placeholder="senha"></input>
                        <button>Entrar</button>
                    </form>
                </div>
                <Link to={"/cadastro"}>
                    <h2>Não tem uma conta? Cadastre-se!</h2>
                </Link>
            </div>
        </>
    )
}