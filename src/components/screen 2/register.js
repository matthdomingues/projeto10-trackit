import logo from "../../assets/logo.PNG";
import { Link } from "react-router-dom";

export default function Register() {
    return (<>
        <div className="registerScreen">
            <div className="registerLogo">
                <img src={logo}></img>
                <h1>TrackIt</h1>
            </div>
            <div className="registerForm">
                <form>
                    <input placeholder="e-mail"></input>
                    <input placeholder="senha"></input>
                    <input placeholder="nome"></input>
                    <input placeholder="foto"></input>
                    <button>Cadastrar</button>
                </form>
            </div>
            <Link to={"/"}>
                <h2>Já tem uma conta? Faça login!</h2>
            </Link>
        </div>
    </>)
}