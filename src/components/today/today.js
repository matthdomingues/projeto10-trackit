import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import styled from "styled-components";
import Menu from "../global-components/Menu";
import Topo from "../global-components/Topo";
import UserContext from "../context/UserContext"
import { useContext, useState, useEffect } from "react";
import Habit from "./today-habits";
import axios from "axios";

export default function Today() {

    const { data } = useContext(UserContext);
    const token = { headers: { Authorization: `Bearer ${data.token}` } };
    const [recarregar, setRecarregar] = useState(false);
    const [habitoHoje, setHabitoHoje] = useState({ habitos: [], qtd: "", qtdConcluidos: "" });

    dayjs.locale('pt-br');

    useEffect(() => {
        if (data !== null) {

            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", token);

            promise.then(response => {
                const qtdHabitos = response.data.length

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

    function recarregarHabitos() {
        setRecarregar(!recarregar)
    };

    return (
        <Screen3>
            <Topo />
            <main>
                <div className="mainTitle">
                    <h2>{dayjs().locale("pt-br").format("dddd, DD/MM")}</h2>
                    {habitoHoje.qtdConcluidos === 0 ?
                        (<h3>Nenhum hábito concluído ainda</h3>) :
                        (<h4>{((habitoHoje.qtdConcluidos / habitoHoje.qtd) * 100).toFixed(0)}% dos hábitos concluídos</h4>)}
                </div>
                {habitoHoje.habitos.map(habitoHoje =>
                    <div className="mainHabits">
                        <Habit key={habitoHoje.key} habitoHoje={habitoHoje} recarregarHabitos={recarregarHabitos} />
                    </div>)}
            </main>
            <Menu recarregar={recarregar} />
        </Screen3>
    )
}

const Screen3 = styled.div`

    background-color: grey;
    height: 667px;
    width: 375px;   

    main {
        width: 100%;
        height: 597px;
        background-color: #E5E5E5;
        padding-left: 17px;
        box-sizing: border-box;
        padding-top: 70px;
        overflow: hidden;
        overflow-y: auto;

        .mainTitle {
            width: 100%;
            height: 107px;
            display: flex;
            flex-direction: column;
            justify-content: center;          

            h2 {
            font-family: 'Lexend Deca', sans-serif;
            font-size: 23px;
            font-weight: 400;
            line-height: 29px;
            letter-spacing: 0em;
            text-align: left;
            color: #126BA5;
            text-transform: capitalize;
            }

            h3 {            
            font-family: 'Lexend Deca', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0em;
            text-align: left;
            color: #BABABA;
            }

            h4 {            
            font-family: 'Lexend Deca', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0em;
            text-align: left;
            color: #8FC549;
            }

        }

        .mainHabits {
            width: 340px;
            min-height: 94px;
            background: #FFFFFF;
            border-radius: 5px;
            margin-bottom: 10px;            
        }               
    }  

`