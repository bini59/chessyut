const style = `
    .user-section{
        display: flex;
        justify-content: space-between;    
    }
    .user-info{
        display:flex;


        width: 300px;
        height: 100px;
        background-color: #fff;        
    }

    #usr-me{
        border-bottom-right-radius: 10px;
    }
    #usr-opp{
        border-bottom-left-radius: 10px;
    }
    .user-info img{
        width : 100px;
        height: 100px;
    }
    .user-info .usr-data{
        width: 200px;
        height: 100px;

        text-overflow: ellipsis;
    }

    .user-info .usr-data .usr-data-text{
        padding: 6px 10px 6px 10px;
    }

    .timer{
        position: absolute;
        top: 5px;
        left: 50vw;
        font-size: 3rem;
    }

    .board{
        display:flex;
        margin-top : 10vh;
        width : 30vw;
        height: 28.25vw;
        margin-left : auto;
        margin-right: auto;
        justify-content: center;
    }

    .dot{
        cursor:pointer;
        width: 100%;

    }

    .dice{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    // .chess-board { border: 1px solid; border-spacing: 0; border-collapse: seperate; }
    .chess-board td { width: 3.75vw; height: 3.75vw; position:relative; text-align: center; font-size:1vw;}
    .chess-board .light { background: #f0d9b5; }
    .chess-board .dark { background: #b58863; }    
    .chess-board .use-normal{ border-radius : 10px; border: 3px solid #8f2700; }
    .chess-board .use-knight{ border: 3px solid #8f2700; }

    .pieceWait{
        display:block;
        width: 2vw;
        height: 2vw;
        margin-left:2%;
        margin-right:2%;
    }
    .pieceWait span{
        position:inherit !important;
    }
    .piece{
        position:inherit !important;
        width:100% !important;
        height:100% !important;
        cursor:pointer;
    }
    .myPiece{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 18vw;
        height: 25vw;
        margin-left:auto;
        margin-right:auto;
        
    }
    .piece-box{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        border:1px solid;
        width: 80%;
        height: 20%;
        margin-bottom: 2%;
    }

    .Game{
        display:flex;
        align-items:center;
    }

    @media (max-width:1500px){
        .Game{
            flex-wrap: wrap;
        }
        .Game section:first-child{
            order:2;
        }
        .Game section:nth-child(2){
            order:1;
        }
        .Game section:last-child{
            order:3;
        }
        .board{
            width: 100%;
            height:56vw;
        }
        .chess-board td{
            width:7.5vw;
            height:7.5vw;
        }
        .myPiece{
            width: 40vw;
            height: 30vw;
        }
        .pieceWait{
            width:5vw;
            height:5vw;
        }
    }
`


export default style