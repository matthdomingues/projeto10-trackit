import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import check from "../../assets/img/check.png"
import UserContext from "../context/UserContext";

export default function Habit({ habitoHoje, recarregarHabitos }) {

    const { data } = useContext(UserContext);

    const token = { headers: { Authorization: `Bearer ${data.token}` } };

    const { id, name, done, currentSequence, highestSequence } = habitoHoje;

    const [concluido, setConcluido] = useState(done);

    function marcarComoConcluido() {
        if (concluido === false) {
            setConcluido(true)
            realizarPostParaServidor("check")
        } else {
            setConcluido(false)
            realizarPostParaServidor("uncheck")
        }
    }

    function realizarPostParaServidor(acao) {

        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${acao}`, {}, token)

        promise.then(() => { recarregarHabitos() })

        promise.catch(error => { alert(`Erro ${error.response.status}. Tente novamente.`) })
    }

    return (
        <Habito>
            <div className="habitText">
                <h1>{name}</h1>
                <span>
                    <h2>Sequência atual:</h2>
                    <Current concluido={concluido}> {currentSequence} dias</Current>
                </span>
                <span>
                    <h2 >Seu recorde:</h2>
                    <Highest currentSequence={currentSequence} highestSequence={highestSequence}> {highestSequence} dias</Highest>
                </span>
            </div>
            <CheckBox onClick={marcarComoConcluido} concluido={concluido}>
                <img src={check}></img>
            </CheckBox>
        </Habito>)
}

const Habito = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 17px 0 17px;

    span {
        display: flex;
    }

    h1 {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        width: 208px;
        word-wrap: break-word;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        padding-bottom: 12px;
    }

    h2 {
        font-family: 'Lexend Deca', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
        margin-right: 5px;
    }       
`

const Current = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: ${props => props.concluido === true ? "#8FC549" : "#666666"};
`

const Highest = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: ${props => props.currentSequence >= props.highestSequence ? "#8FC549" : "#666666"};
`

const CheckBox = styled.div`
    width: 69px;
    height: 69px;
    background: ${props => props.concluido === true ? "#8FC549" : "#EBEBEB"};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`