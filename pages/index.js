import Link from "next/link";

const style = `
    .container{
      display: flex;
      flex-direction: column;
      justify-content: center;

      height: 100vh;
      width:100%;
      padding-bottom: 10%;
    }

    h1{
      display: flex;
      justify-content: center;
      margin: 0px 0px 20px 0px;
      font-size: 60px;

    }
    .login-section{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    
    .input_account{
      display: flex;
      align-items: center;

      margin-bottom: 10px;
      width: 20%;
    }

    .idpassId{
      width : 60px;
    }
    input{
      border-radius: 4px;
      border: 1px solid rgb(0 0 0 / 0%);
      box-shadow: 2px 2px 1px 0px #00000022;

      width: 100%;
      height: 40px;

      font-size: 20px;
    }

    .social-login{
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .social-button{
      width: 40px;
      height: 40px;
      margin-right: 10px;

      box-shadow: 1px 2px 0 rgb(0,0,0,0.5);

      border: 0;
      border-radius: 4px;
    }
    .social-button:active{
      box-shadow: 0.5px 1px 0 rgb(0,0,0,0.5);
    }
  `;

const Home = () => {

  const social = ["kakao", "google", "apple", "facebook"]

  const socialLogin = ()=>{
    const result = []
    for(var i = 0; i < social.length; i++){
      result.push(<button className="social-button">{social[i]}</button>)
    }
    return result
  }



  return (
    <div className="container">
      <h1>Chess Yut</h1>
      {/* 로그인 섹션  */}
      <section className="login-section">
        <div className="input_account"><div className="idpassId">id : </div><input placeholder="id"/></div>
        <div className="input_account"><div className="idpassId">pass : </div><input placeholder="password"/></div>
        <section className="social-login">{socialLogin()}</section>
        <Link href="/list"><button>move to list</button></Link>
      </section>
      <style jsx>{style}</style>
    </div>

  );
}


export default Home;