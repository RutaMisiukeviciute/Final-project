import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledDialog = styled.dialog`
height: 150px;
font-size: 22px;
border-radius: 10px;
border: 3px solid #1e1e1e;
text-align: center;
>button{
  margin-top: 30px;
  background-color: #3c3633;
  width: 80px;
  height: 35px;
  color: #eeedeb; 
  border: 1px solid #3c3633;
  border-radius: 5px ;
  cursor: pointer;
  box-shadow: 1px 3px 10px 0 #3c3633;

  &:hover{
            box-shadow: -1px -3px 10px 0 #1e1e1e inset;
          }
}

>button:first-of-type{
  margin-right: 20px;
}
`;


export default function ModalDialogDelete({ isOpen, children }) {
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