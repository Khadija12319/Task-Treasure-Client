import moment from "moment";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { Link } from "react-router-dom";

const Footer= () => {
    return(
        <div>
            <footer className="footer footer-center p-10 bg-[#3D52A0] text-primary-content">
  <aside>
  <GiTwoCoins className="text-yellow-500 text-6xl"/>
    <p className="font-bold">
    <Link to='/' className="text-4xl"> TaskTreasure</Link> <br/><span className="text-lg">Providing reliable tech since 1992</span>
    </p> 
    <p>Copyright © {moment().format('YYYY')} - All right reserved</p>
  </aside> 
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a href="https://www.linkedin.com/in/khadijatul-kobra5" target="_blank"><FaLinkedin className="text-3xl"/></a>
      <a href="https://www.facebook.com/mourita.bhuiyan?mibextid=ZbWKwL" target="_blank"><FaFacebookF className="text-3xl"/></a>
      <a href="https://github.com/Khadija12319" target="_blank"><FaGithub className="text-3xl"/></a>
    </div>
  </nav>
</footer>
        </div>
    )
}

export default Footer;