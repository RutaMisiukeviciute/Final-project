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
  width: 160px;
}

>div {
  >ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  gap: 10px;

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