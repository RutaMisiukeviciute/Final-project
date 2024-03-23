import styled from "styled-components";

const StyledQuestion = styled.div`
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 10px;
  text-align: center;
  background-color: #f0f8ff65;

  width: 90%;

  margin: 15px 0;

  >img{
    width: 80%;
  }
`;

const Question = ({ data, countNum }) => {

  return (
    <StyledQuestion>
      <h1>{data.title}</h1>
      <p>{data.rating}</p>
      <p>{countNum}</p>
      {data.edited && <p>Edited</p>}
    </StyledQuestion>
  );
}

export default Question;