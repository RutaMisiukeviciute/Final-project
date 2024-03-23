import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../media/logo.png'

const StyledHeader = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
height: 133px;
background-color: #e0ccbe;

>img {
  height: 180px;
}

>div {

  padding-right: 30px;
  >ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  gap: 10px;
  

  >li {

      width: 147px;
      height: 50px;
      border: 1px solid #3c3633;
      border-radius: 9px;
      background-color: #3c3633;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      box-shadow: 1px 3px 10px 0 #3c3633;

      &:hover{
        box-shadow: -1px -3px 10px 0 #f8c2a7;
      }
      
    >a{
      color: #eeedeb;
      text-decoration: none;
      font-size: 32px;
      text-align: center;
    }
  }

}
}
`;

const Header = () => {
  return (
    <StyledHeader>
      <img src={logo} alt="My page logo" />
      <div>
        <ul>
          <li><a href="#">Login</a></li>
          <li><a href="#">Register</a></li>
        </ul>
      </div>
    </StyledHeader>
  );
}

export default Header;