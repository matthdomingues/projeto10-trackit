import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import styled from "styled-components";
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Menu({ recarregar }) {

    const { data } = useContext(UserContext);

    const [habitoHoje, setHabitoHoje] = useState({ habitos: [], qtd: "", qtdConcluidos: "" });

    const token = { headers: { Authorization: `Bearer ${data.token}` } };

    useEffect(() => {
        if (data !== null) {

            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", token);

            promise.then(response => {
                const qtdHabitos = response.data.length;

                const qtdHabitosConcluidos = response.data.filter(habito => {
                    if (habito.done) {
                        return true
                    }
                }).length

                setHabitoHoje({ ...habitoHoje, habitos: response.data, qtd: qtdHabitos, qtdConcluidos: qtdHabitosConcluidos })

            })

            promise.catch(error => { alert(`Erro ${error.response.status}. Tente novamente.`) })
        }
    }, [data, recarregar]);

    let x = (habitoHoje.qtdConcluidos / habitoHoje.qtd) * 100;

    return (
        <Footer>
            <Link to={"/habitos"}>
                <h6>Hábitos</h6>
            </Link>
            <Hoje>
                <Link to={"/hoje"}>
                    <CircularProgressbar
                        value={x}
                        text={`Hoje`}
                        background={true}
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                </Link>
            </Hoje>
            <Link to={"/historico"}>
                <h6>Histórico</h6>
            </Link>
        </Footer>
    )
}

const Footer = styled.div`

        position: fixed;
        width: 375px;
        height: 70px;
        background: #FFFFFF;
        display: flex;        
        align-items: center;
        justify-content: space-evenly;

        

        h6 {
            font-family: 'Lexend Deca', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 17.976px;
            line-height: 22px;
            text-align: center;
            color: #52B6FF;
        }

        a {text-decoration: none;
            font-family: 'Lexend Deca', sans-serif;}

        Link {
            cursor: pointer;
        }

`

const Hoje = styled.div`
    width: 91px;
    height: 91px;
    background-color: #52B6FF;
    border-radius: 50%;
    padding: 3px;
    margin-bottom: 30px;    
`