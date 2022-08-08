import { useContext } from "react"
import styled from "styled-components"
import UserContext from "../context/UserContext"

export default function Topo() {

    const { data } = useContext(UserContext);

    let picture = data.image;

    return (
        <Header>
            <h1>TrackIt</h1>
            <img src={picture}></img>
        </Header>
    )
}

const Header = styled.div`

        position: fixed;
        width: 375px;
        height: 70px;
        background-color: #126BA5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        box-sizing: border-box;

        h1 {
            font-family: 'Playball', cursive;
            font-style: normal;
            font-weight: 400;
            font-size: 38.982px;
            line-height: 49px;
            color: #FFFFFF;
        }

        img {
            width: 51px;
            height: 51px;
            border-radius: 98.5px;
        }


`