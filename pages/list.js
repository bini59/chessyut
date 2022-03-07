import Link from "next/link"


const style = `
.Nav-container{
    background-color: #fff;
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

.container{
    width: 100%;
    margin: 0 auto 0 auto;
}

div.container{
    padding-top: 30px;
}

@media (min-width: 576px) {
    .container{
        max-width: 540px;
    }
}
@media (min-width: 768px) {
    .container{
        max-width: 720px;
    }
}
@media (min-width: 992px) {
    .container{
        max-width: 960px;
    }
}
@media (min-width: 1200px) {
    .container{
        max-width: 1040px;
    }
}
    
`


const list = ()=>{




    const navbar = (
        <div className="Nav-container">
            <nav className="nav container">
                <div>
                    <Link href="/list"><a>Chess</a></Link>
                </div>
                

                <div className="profile">nickname</div>
            </nav>
        </div>
    )   

    return(
        <>
            {navbar}
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th className="first-item" style={{width: "14%"}}>#</th>
                            <th className="second-item" style={{width: "60%"}}>T</th>
                            <th className="third-item" style={{width: "26%"}}>사람</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>체스 윷놀이 테스트</td>
                            <td>3/4</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <style jsx>{style}</style>
        </>
    )
}



export default list;