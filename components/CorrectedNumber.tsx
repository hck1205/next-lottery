import styled from '@emotion/styled';

type Props = {
  numberOfInputs: number;
};

function CorrectedNumber({ numberOfInputs }: Props) {
  return (
    <Wrapper>
      {[...Array(numberOfInputs + 1)].map((_, index) => (
        <div key={`target_number_${index}`}>
          <div className="percentage">
            <div>{`${numberOfInputs - index}자리 맞춤`}</div>
            <span className="splitter" />
            <div
              className="percentage"
              id={`category__sub__percentage__${numberOfInputs - index}`}
            />
            <span className="splitter" />
            <div
              id={`category__sub__corrected__cnt__${numberOfInputs - index}`}
            />
          </div>
          <div className={'numbers'}>
            <div
              className="history"
              id={`category__sub__history__${numberOfInputs - index}`}
            ></div>
          </div>
        </div>
      ))}
    </Wrapper>
  );
}
const sidePadding = 30;
const Wrapper = styled.div`
  .percentage {
    display: flex;
    padding: 5px 0;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    font-weight: bold;
    border-bottom: 1px solid #ececec;
  }

  .numbers {
    span {
      padding: 0 10px;
    }
  }

  .history {
    padding: 0 ${sidePadding}px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    max-height: 200px;
    overflow: auto;

    @media only screen and (max-width: 768px) {
      padding: 10px 10px;
    }

    span {
      padding: 5px 15px;
    }
  }

  .splitter {
    height: 10px;
    width: 1px;
    background-color: #dadada;
  }
`;

export default CorrectedNumber;
