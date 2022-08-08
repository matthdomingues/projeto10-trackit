import styled from "styled-components"
import { useState } from "react"

export default function Day(props) {

    const { dia, id, obterDiaSelecionado, removerDiaDesmarcado, carregando } = props;

    const [selecionado, setSelecionado] = useState(false);

    function selecionar() {
        if (!selecionado) {
            setSelecionado(true)
            obterDiaSelecionado(id)
        } else {
            setSelecionado(false)
            removerDiaDesmarcado(id)
        }
    }

    return (<Dia disabled={carregando} onClick={selecionar}
        selecionado={selecionado}>
        {dia}
    </Dia>)
}

const Dia = styled.span`
    width: 30px;
    height: 30px;
    cursor: pointer;
    
    margin-right: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-family: 'Lexend Deca', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: ${props => props.selecionado === true ? "#FFFFFF" : "#DBDBDB"};
    
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    
    background: ${props => props.selecionado === true ? "#CFCFCF" : "#FFFFFF"};

    &:disabled{
            opacity: 0.7;
        }
`