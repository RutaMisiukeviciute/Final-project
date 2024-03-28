import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../../media/logo.png'

const StyledFooter = styled.footer`
height: 175px;
display: flex;
justify-content: space-between;
align-items: center;
background-color: #747264;

>.legal{
  margin-left: 30px;
  
  >h3{
    font-size: 25px;
    color: #edccbe;
    margin: 10px 0;
  }

  >ul{
    margin: 0;
  padding: 0;
  list-style-type: none;
  color: #edccbe;
    >li{
      margin: 15px 0;

      >a{
        color: #edccbe;
        text-decoration: none;
      }
    }
  }
}

>.logoCopy{
  display: flex;
  flex-direction: column;
  align-items: center;
  >a{
    margin: 0;
    >img{
    height: 130px;
    width: auto;
  }
  }

  >p{
    font-size: 14px;
    color: #edccbe;
    margin-bottom: 0;
    
  }
}

>.social{
  margin-right: 30px;
  height: 175px;
  
  >h3{
    font-size: 25px;
    color: #edccbe;
    margin: 10px 0;
  }

  >ul{
    margin: 0;
  padding: 0;
  list-style-type: none;
  
  >li{
    margin: 15px;
    >a{
      text-decoration: none;
      margin: 80px 15px;
      >i{
        color: #edccbe;
        font-size: 27px;
      }
    }
  }
}
}
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="legal">
        <h3>Legal</h3>
        <ul>
          <li><Link>Terms & Conditions</Link></li>
          <li><Link>Privacy Policy</Link></li>
          <li><Link>Terms of use</Link></li>
        </ul>
      </div>
      <div className="logoCopy">
        <Link to='/'><img src={logo} alt="My page logo" /></Link>
        <p>Copyrights &copy; 2024 by R. Misiukeviciute</p>
      </div>
      <div className="social">
        <h3>Contact Us!</h3>
        <ul>
          <li>
            <Link><i className="bi bi-facebook"></i></Link>
            <Link><i className="bi bi-instagram"></i></Link>
          </li>
          <li>
            <Link><i className="bi bi-twitter-x"></i></Link>
            <Link><i className="bi bi-linkedin"></i></Link>
          </li>
        </ul>
      </div>
    </StyledFooter>
  );
}

export default Footer;