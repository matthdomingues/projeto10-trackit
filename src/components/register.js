import logo from "./../assets/img/logo.PNG";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function Register() {

    // variaveis para animação de carregamento
    const [carregando, setCarregando] = useState(false);

    // variaveis para formulario
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");

    function cadastrar(e) {
        e.preventDefault();
        setCarregando(true);
        let requestRegister = ({
            email: `${email}`,
            name: `${nome}`,
            image: `${foto}`,
            password: `${senha}`
        });

        console.log(requestRegister);

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", requestRegister);

        request.then(() => {
            alert('Cadastro feito com sucesso!');
            setCarregando(false);
        });

        request.catch(() => {
            alert('Falha no Cadastro!');
            setCarregando(false)
        });
    };

    return (<>
        <Screen2>
            <Logo>
                <img src={logo}></img>
                <h1>TrackIt</h1>
            </Logo>
            <form onSubmit={cadastrar}>
                <input disabled={carregando} type="text" onChange={(e) => setEmail(e.target.value)} placeholder="e-mail" value={email} required></input>
                <input disabled={carregando} type="password" onChange={(e) => setSenha(e.target.value)} placeholder="senha" value={senha} required></input>
                <input disabled={carregando} type="text" onChange={(e) => setNome(e.target.value)} placeholder="nome" value={nome} required></input>
                <input disabled={carregando} type="text" onChange={(e) => setFoto(e.target.value)} placeholder="foto" value={foto} required></input>
                <button disabled={carregando} type="submit">{carregando === true ? (<ThreeDots color="#FFFFFF" height={50} width={50} />) : ("Cadastrar")}</button>
            </form>
            <Link to={"/"}>
                <h2>Já tem uma conta? Faça login!</h2>
            </Link>
        </Screen2>
    </>)
}

const Screen2 = styled.div`

    background-color: white;
    height: 667px;
    width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
    font-family: 'Playball', cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 68.982px;
    line-height: 86px;
    text-align: center;
    color: #126BA5;
    }

    form {
    display: flex;
    flex-direction: column;

    input {
    width: 303px;
    height: 45px;
    background-color: ${props => props.carregando === "true" ? "#F2F2F2" : "#FFFFFF"};
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

    }
    
    button {
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
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    margin-bottom: 25px;
    box-sizing: border-box;
    cursor: pointer;

    &:disabled{
            opacity: 0.7;
        }

    }

    }

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