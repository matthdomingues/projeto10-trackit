import { useContext } from "react";
import UserContext from "../context/UserContext"
import axios from 'axios'
import styled from 'styled-components'
import trash from "../../assets/img/trash.jpeg"

export default function Habit(props) {

    const { data } = useContext(UserContext);

    const { habitos, diasDaSemana, recarregarHabitos } = props;

    function deletarHabito() {
        const token = { headers: { Authorization: `Bearer ${data.token}` } };

        const text = window.confirm('Você tem certeza que gostaria de apagar o hábito?');

        if (text === true) {
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitos.id}`, token);
            promise.then(() => { recarregarHabitos() });
            promise.catch(error => { alert(`Erro ${error.response.status}. Tente novamente.`) });
        } else { return; }
    }

    return (
        <Habito>
            <div>
                <h1>{habitos.name}</h1>
                <div className="diasHabito">
                    {diasDaSemana.map((dia, i) => {
                        let selecionado = false

                        if (habitos.days.includes(i)) {
                            selecionado = true
                        }

                        return <DiaDaSemana key={i} selecionado={selecionado}>{dia}</DiaDaSemana>
                    })}
                </div>
            </div>
            <img src={trash} onClick={deletarHabito} />
        </Habito>
    )

}

const Habito = styled.div`
    width: 340px;
    min-height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    margin-bottom: 10px;

    h1 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        width: 208px;
        word-wrap: break-word;
        color: #666666;
        padding-top: 13px;
        padding-left: 15px;
        box-sizing: border-box;
    }

    img {
        width: 20px;
        height: 25px;
        margin-left: 45px;
        margin-top: 8px;
        cursor: pointer;
    }

    .diasHabito{
        display: flex;
        padding-top: 8px;
        padding-left: 15px;
        box-sizing: border-box;
        
    }
`

const DiaDaSemana = styled.span`
    width: 30px;
    height: 30px;
    
    margin-right: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca';
    
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: ${props => props.selecionado === true ? "#FFFFFF" : "#DBDBDB"};
    
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    
    background: ${props => props.selecionado === true ? "#CFCFCF" : "#FFFFFF"};
`