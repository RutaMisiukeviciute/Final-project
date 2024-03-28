import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledDialog = styled.dialog`
height: 200px;
width: 400px;
font-size: 22px;
border-radius: 10px;
border: 3px solid #1e1e1e;
text-align: center;
>button{
  margin-top: 10px;
  background-color: transparent;
  width: 80px;
  height: 35px;
  color: #3c3633; 
  text-decoration: underline;
  border: none;
  cursor: pointer;

  &:hover{
        color: #1e1e1e;
        font-weight: 700;
      }
}

>form{
  >div{
    >textarea{
    border: none;
    border-bottom: 1px solid #1e1e1e ;
  }
  }
  >input {
    margin-top: 5px;
    background-color: #3c3633;
  width: 80px;
  height: 35px;
  color: #eeedeb; 
  border: 1px solid #3c3633;
  border-radius: 5px ;
  cursor: pointer;
  box-shadow: 1px 3px 10px 0 #3c3633;
  margin-bottom: 0;

  &:hover{
            box-shadow: -1px -3px 10px 0 #1e1e1e inset;
          }
  }
}
`;

export default function ModalDialogEdit({ isOpen, children }) {
  const ref = useRef();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
    };
  }, [isOpen]);

  return <StyledDialog ref={ref}>{children}</StyledDialog>;
}