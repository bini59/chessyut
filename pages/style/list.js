const style = `
.Nav-container{
    background-color: #fff;
}

.create-btn-wrapper{
    width: 100%;
    display:flex;
    justify-content: flex-end;
}

nav{
    height: 40px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding : 0 15px 0 15px;
}
table{
    width: 100%;
    border-collapse: collapse;
}
table td, th{
    text-align: center;
    font-size: 14px;

    padding: 0.75rem;
    margin:0;
}
table th{
    vertical-align: bottom;
    border-top: 1px solid #dee2e6;
    border-bottom: 2px solid #dee2e6;
    font-weight: bold;
}
table td{
    border-bottom: 1px solid #dee2e6;
}
tbody tr:hover{
    background-color: #f1f1f1;
}

.container{
    width: 100%;
    margin: 0 auto 0 auto;

}

div.container{
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
}


.create-window{
    display:flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    top: 200px;
    width: 60%;
    height: 170px;
    background-color: #fff;
    border-radius: 15px;
}
.create-btn{
    float: right;
}
.create-input-title{
    background-color: #c9c9c9;
    text-align: center;
    border-radius : 6px;
    border-style: solid;
    bodrer-width: 1px;
    bodrer-color: rgb(184, 184, 184);
    margin-left: 2%;

    width: 90%;
    font-size:20px;
}
.create-window-det-btn{
    margin-right: 10px;
}
.create-window div{
    display:flex;
    margin-bottom: 10px;
    margin-top: 10px;
    padding-left: 4%;
    padding-right: 4%;
}
.input-title-wrapper{
    align-items: center;
    font-size:20px;
}
.det-btn-wrapper{
    
    justify-content: flex-end;
}
.det-btn-wrapper button{
    width: 75px;
}

@media (max-width: 1200px){
    .input-title-wrapper, .create-input-title{
        font-size: 18px;
        margin-left: 1%;
    }
    .create-input-title{
        width: 85%;
    }
}
@media (max-width: 768px) {
    .input-title-wrapper, .create-input-title{
        font-size: 17px;
    }
    .create-input-title{
        width: 83%;
    }
}
// @media (max-width)

@media (min-width: 576px) {
    .container{
        max-width: 540px;
    }
    .create-window{
        max-width: 378px;
    }
}
@media (min-width: 768px) {
    .container{
        max-width: 720px;
    }
    .create-window{
        max-width: 504px;
    }
}
@media (min-width: 992px) {
    .container{
        max-width: 960px;
    }
    .create-window{
        max-width: 692px;
    }
}
@media (min-width: 1200px) {
    .container{
        max-width: 1040px;
    }
    .create-window{
        max-width: 728px;
    }
}
`

export default style;