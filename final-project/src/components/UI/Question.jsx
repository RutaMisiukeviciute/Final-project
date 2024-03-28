import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledQuestion = styled.div`
 box-sizing: border-box;
  border: 2px solid black;
  border-radius: 13px 8px 13px 4px;
  margin-bottom: 15px;
  position: relative;
  box-shadow: 1px 3px 5px 0 #747264;
  background-color: white;
  color: #1e1e1e;

  &:hover{
    box-shadow: -1px -2px 10px 0 #747264 inset;
  }

  >a{
   text-decoration: none;
   color: #1E1E1E;

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
}
`;

const Question = ({ data, countNum, questionAuthors }) => {
  return (
    <StyledQuestion>
      <Link to={`/${data.id}`}>
        <h1>{data.title}</h1>
        <div>
          {data.likes && <p className={(data.likes.length - data.dislikes.length) > 0 ? "green" : (data.likes.length - data.dislikes.length) < 0 ? "red" : "zero"}>
            {data.likes.length - data.dislikes.length} rating
          </p>}
          <p >{countNum} answers</p>
        </div>
        {data.edited && <p>Edited</p>}
        <p>Asked by {questionAuthors} at {data.date.substring(0, 10)}</p>
      </Link>
    </StyledQuestion>
  );
}

export default Question;