import Topo from "./global-components/Topo"
import Menu from "./global-components/Menu"
import styled from "styled-components"

export default function History() {

    return (
        <Screen5>
            <Topo />
            <main>
                <div className="mainTitle">
                    <h2>Histórico</h2>
                    <br />
                    <h3>Em breve você poderá ver o histórico dos seus hábitos aqui!</h3>
                </div>
            </main>
            <Menu />
        </Screen5 >
    )

}

const Screen5 = styled.div`

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

        .mainTitle {
            width: 100%;
            height: 107px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-top: 30px;
            box-sizing: border-box;

            h2 {
            font-family: 'Lexend Deca', sans-serif;
            font-size: 23px;
            font-weight: 400;
            line-height: 29px;
            letter-spacing: 0em;
            text-align: left;
            color: #126BA5;
            }

            h3 {
            font-family: 'Lexend Deca', sans-serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0em;
            text-align: left;
            color: #666666;
            }

        }

    }

`