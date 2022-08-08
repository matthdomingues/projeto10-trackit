import Topo from "../global-components/Topo"
import Menu from "../global-components/Menu"
import styled from "styled-components"
import UserContext from "../context/UserContext"
import { useContext, useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import Dia from "./day";
import axios from "axios";
import Habito from "./habit";

export default function Habits() {

    const { data, progresso } = useContext(UserContext);

    const [novoHabito, setNovoHabito] = useState("");
    const [habitos, setHabitos] = useState([]);
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const [exibirCriacao, setExibirCriacao] = useState(false);
    const [recarregar, setRecarregar] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const token = { headers: { Authorization: `Bearer ${data.token}` } };

    const diasDaSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    function obterDiaSelecionado(id) {
        setDiasSelecionados([...diasSelecionados, id])
    }

    function removerDiaDesmarcado(id) {
        setDiasSelecionados(
            diasSelecionados.filter(diaSemana => {
                if (diaSemana !== id) return true
            })
        )
    }

    // cadastrar habitos 

    function criarHabito(e) {
        e.preventDefault();
        setCarregando(true);

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', { name: novoHabito, days: diasSelecionados }, token);

        promise.then((response) => {
            setTimeout(() => {
                setExibirCriacao(false);
                recarregarHabitos();
                setNovoHabito("");
                setCarregando(false)
            }, 1000)
        })

        promise.catch(error => {
            alert(`Erro ${error.response.status}. Tente novamente.`);
            setCarregando(false)
        })
    }

    // renderizar habitos

    useEffect(() => {
        if (data !== null) {
            const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', token);

            promise.then((response) => { setHabitos(response.data) });
        }
    }, [data, recarregar]);

    function recarregarHabitos() {
        setRecarregar(!recarregar)
    }

    return (
        <Screen4>
            <Topo />
            <main>
                <div className="mainTitle">
                    <h2>Meus Hábitos</h2>
                    <button onClick={() => { setExibirCriacao(true) }}><p>+</p></button>
                </div>
                {exibirCriacao == false ? (<></>) : (
                    <NovoHabito> <form onSubmit={criarHabito}>
                        <input disabled={carregando} type="text" placeholder="nome do hábito" required onChange={e => { setNovoHabito(e.target.value) }} />
                        <div className="diasSemana">
                            {diasDaSemana.map((dia, i) => <Dia carregando={carregando} dia={dia} key={i} id={i} obterDiaSelecionado={obterDiaSelecionado}
                                removerDiaDesmarcado={removerDiaDesmarcado} />)}
                        </div>
                        <div className="botoes">
                            <Button1 disabled={carregando} desaonClick={() => { setExibirCriacao(false) }} className="botaoCancelar">
                                <h1>Cancelar</h1>
                            </Button1>
                            <Button2 disabled={carregando} type="submit" className="botaoSalvar">
                                {carregando === true ? (<ThreeDots color="#FFFFFF" height={50} width={50} />) : (<h2>Salvar</h2>)}
                            </Button2>
                        </div>
                    </form> </NovoHabito>
                )}
                <div className="mainText">
                    <ul>
                        {habitos.length === 0 ?
                            (<h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3>) :
                            (habitos.map(habitos => <Habito key={habitos.id} habitos={habitos} diasDaSemana={diasDaSemana} recarregarHabitos={recarregarHabitos} />))}
                    </ul>
                </div>
            </main>
            <Menu progresso={progresso} />
        </Screen4>
    )
}


const Screen4 = styled.div`

    background-color: grey;
    height: 667px;
    width: 375px;   

    main {
        width: 100%;
        height: 597px;
        background-color: #E5E5E5;
        padding-left: 17px;
        padding-right: 17px;
        box-sizing: border-box;
        padding-top: 70px;
        overflow: hidden;
        overflow-y: scroll;

        .mainTitle {
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;        

            h2 {
            font-family: 'Lexend Deca', sans-serif;
            font-size: 23px;
            font-weight: 400;
            line-height: 29px;
            letter-spacing: 0em;
            text-align: left;
            color: #126BA5;
            }

            button {
                width: 40px;
                height: 35px;
                background: #52B6FF;
                border-radius: 4.63636px;
                border: #52B6FF;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            p {
                font-family: 'Lexend Deca', sans-serif;
                font-style: normal;
                font-weight: 400;
                font-size: 26px;
                line-height: 34px;
                color: #FFFFFF;
                margin-top: -5px;
            }



        }

        .mainText {

            h3 {
                font-family: 'Lexend Deca', sans-serif;
                font-style: normal;
                font-weight: 400;
                font-size: 17.976px;
                line-height: 22px;
                color: #666666;
            }           

        }

    }

`

const NovoHabito = styled.div`

    width: 340px;
    height: 180px;
    left: 17px;
    top: 147px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;

    input {
        width: 303px;
        height: 45px;
        left: 36px;
        top: 165px;
        background: ${props => props.carregando === true ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding-left: 11px;
        margin-top: 18px;
        box-sizing: border-box;        

        ::placeholder {
            font-family: 'Lexend Deca';
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

    .diasSemana {
        display: flex;
        margin-top: 8px;
    }
    
    .botoes {
        display: flex;
        margin-top: 30px;
        margin-left: 135px;
    }
            
`

const Button1 = styled.button`
            width: 84px;
            height: 35px;
            background: #ffffff;
            border-radius: 4.63636px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 5px;
            box-sizing: border-box;
            cursor: pointer;
            border: #ffffff;

            &:disabled{
            opacity: 0.7;
            }

            h1 {
                font-family: 'Lexend Deca', sans-serif;
                font-style: normal;
                font-weight: 400;
                font-size: 15.976px;
                line-height: 20px;
                text-align: center;
                color: #52B6FF;
            }
`

const Button2 = styled.button`
            width: 84px;
            height: 35px;
            background: #52B6FF;
            border-radius: 4.63636px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: #52B6FF;

            &:disabled{
            opacity: 0.7;
        }

            h1 {
                font-family: 'Lexend Deca', sans-serif;
                font-style: normal;
                font-weight: 400;
                font-size: 15.976px;
                line-height: 20px;
                text-align: center;
                color: #FFFFFF;
            }
`


