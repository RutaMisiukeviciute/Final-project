import styled from "styled-components";

const StyledOneAswer = styled.div`
 box-sizing: border-box;
  border: 2px solid black;
  border-radius: 13px 8px 13px 4px;
  margin-bottom: 15px;
  position: relative;
  box-shadow: 1px 3px 5px 0 #747264;
  background-color: white;
  color: #1e1e1e;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px 5%;
  padding: 0 10px;

  >div{
    h1{
    text-align: left;
    margin-left: 10px;
  }

  >div{
    display: flex;
    gap: 15px ;
    font-size: 22px;
    margin-left: 10px;

    >.green{
    color: green;
  }
    >.red{
    color: #940000;
  }
    >.zero{
    color: #1E1E1E;
  }

  }

  >p:first-of-type{
    font-size: 20px;
    position: absolute;
    top: 30px;
    right: 10px;
    margin: 0;
  }
  >p:last-of-type{
    font-size: 20px;
    position: absolute;
    top: 5px;
    right: 10px;
    margin: 0;
  }

  >.editDelete{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  }
`;

const Answer = ({ data, answerAutors }) => {

  return (
    <StyledOneAswer>
      <h1>{data.answer}</h1>
      <div>

        {data.edited && <p>Edited</p>}
        <p>Answered by {answerAutors}</p>
      </div>
      <p className={data.rating > 0 ? "green" : data.rating < 0 ? "red" : "zero"}>
        {data.rating} rating
      </p>
    </StyledOneAswer>
  );
}

export default Answer;