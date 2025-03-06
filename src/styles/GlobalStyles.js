import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}

body{
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    height: 100dvh;

}



a {
    text-decoration: none;
    color: rgb(113,113,113);
    position: relative;
}

a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -8px;
    left: 0;
    background-color: rgb(239, 48, 109);
    visibility: hidden;
    transition: all 0.4s ;
}

a:hover::after {
    visibility: visible;
    width: 100%;
}

button{
    cursor: pointer;
    background-color: rgb(78, 46, 145);
    color: #fff;
    border: 1px solid transparent;
    transition: all 0.5s;
}

    header{
        width: 100% ;
        margin-left: auto;
        box-shadow:rgba(0, 0, 0, 0.29) 0px 10px 29px -1px;
    nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        img{
            margin-left:  200px;
        }
    }
}
`;
