import Link from "next/link";
import Style from "./style/index"

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
        <div className="input_account"><div className="idpassId">pass : </div><input type="password" placeholder="password"/></div>
        <section className="social-login">{socialLogin()}</section>
        <Link href="/list"><button>move to list</button></Link>
      </section>
      <style jsx>{Style}</style>
    </div>

  );
}


export default Home;