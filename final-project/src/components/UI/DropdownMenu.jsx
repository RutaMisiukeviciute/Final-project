import { useState } from 'react';
import styled from 'styled-components';

const StyledDropDown = styled.div`
position: relative;
height: 80px;

>button {
  width: 180px;
    height: 40px;
    border: 1px solid #3c3633;
    border-radius: 9px;
    background-color: #3c3633;
    box-shadow: 1px 3px 10px 0 #3c3633;
    color: #eeedeb;
    font-size: 22px;
    cursor: pointer;

    &:hover{
      box-shadow: -1px -3px 10px 0 #1e1e1e inset;
    }
}

>ul{
  position: absolute;
  top: 20px;
  left: 0;
  text-align: center;
  
  padding-left: 0;
  background-color: #57514e;
  color: #eeedeb;
  width: 180px;
  border-radius: 0 0 8px 8px;

  >li{
    list-style: none;
    height: 25px;
    cursor: pointer;
    font-size: 20px;
    border-bottom: 1px solid #3c3633;
  }
  >li:last-of-type{
    border: none;
  }
}
 
`;


const DropdownMenu = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <StyledDropDown >
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : 'All'} <i className="bi bi-funnel"></i>
      </button>
      {isOpen && (
        <ul >
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </StyledDropDown>
  );
};

export default DropdownMenu;