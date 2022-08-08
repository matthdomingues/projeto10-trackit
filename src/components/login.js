import logo from "./../assets/img/logo.PNG";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "./context/UserContext";

export default function Login() {

    const { setData } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    function logar(e) {
        e.preventDefault();

        setCarregando(true);

        let requestLogin = ({
            email: `${email}`,
            password: `${senha}`
        });

        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', requestLogin);

        request.then((response) => {
            setCarregando(false);
            setData(response.data);
            setTimeout(() => {
                setEmail("");
                setSenha("");
                navigate("/hoje")
            }, 1000)
                ;
        });

        request.catch(() => {
            setCarregando(false);
            alert('Falha no Login!')
            setEmail("");
            setSenha("");
        });
    };

    return (
        <>
            <Screen1>
                <Logo>
                    <img src={logo}></img>
                    <h1>TrackIt</h1>
                </Logo>
                <form onSubmit={logar}>
                    <Input1 disabled={carregando} type="text" onChange={(e) => setEmail(e.target.value)} placeholder="e-mail" value={email} required></Input1>
                    <Input2 disabled={carregando} type="password" onChange={(e) => setSenha(e.target.value)} placeholder="senha" value={senha} required></Input2>
                    <Button1 disabled={carregando} type="submit">
                        {carregando === true ? (<ThreeDots color="#FFFFFF" height={50} width={50} />) : ("Entrar")}
                    </Button1>
                </form>
                <Link to={"/cadastro"}>
                    <h2>Não tem uma conta? Cadastre-se!</h2>
                </Link>
            </Screen1>
        </>
    )
}

const Screen1 = styled.div`

    background-color: white;
    height: 667px;
    width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 13.976px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
    cursor: pointer;
    }

    form {

    display: flex;
    flex-direction: column;           
    }
`

const Input1 = styled.input`        
        width: 303px;
        height: 45px;
        background-color:  ${props => props.desabilitar === "disabled" ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
        padding-left: 10px;
        box-sizing: border-box;
        cursor: pointer;

        ::placeholder {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        }

        &:disabled{
            opacity: 0.7;
        }
`

const Input2 = styled.input`        
        width: 303px;
        height: 45px;
        background-color: ${props => props.desabilitar === "disabled" ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
        padding-left: 10px;
        box-sizing: border-box;
        cursor: pointer;

        ::placeholder {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        }

        &:disabled{
            opacity: 0.7;
        }
`

const Button1 = styled.button`
        display: flex;
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: #52B6FF;
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
        margin-bottom: 25px;
        box-sizing: border-box;
        cursor: pointer;
        text-align: center;
        align-items: center;
        justify-content: center;

        &:disabled{
            opacity: 0.7;
        }
`

const Logo = styled.div`
    margin-top: 68px;
    margin-bottom: 40px;
    box-sizing: border-box;
    
    img {
    margin-left: 10px;
    }

    h1 {
    font-family: 'Playball', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 68.982px;
    line-height: 86px;
    text-align: center;
    color: #126BA5;
    }
`