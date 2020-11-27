import styled from '@emotion/styled';
import { useMemo } from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

type Props = {
  numberOfInputs: number;
};

function CorrectedNumber({ numberOfInputs }: Props) {
  const leastNumber = useMemo(() => Math.floor(numberOfInputs / 2), []);
  return (
    <Wrapper>
      <Collapse accordion>
        {[...Array(numberOfInputs + 1)].map((_, index) => {
          const header = (
            <div key={`percentage_number_${index}`} className="percentage">
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
          );

          const history = (
            <div key={`history_number_${index}`}>
              <div className={'numbers'}>
                <div
                  className="history"
                  id={`category__sub__history__${numberOfInputs - index}`}
                ></div>
              </div>
            </div>
          );
          return (
            <Panel
              header={header}
              key={`target_number_${index}`}
              forceRender={true}
            >
              {index > leastNumber ? (
                <div>낮은 적중은 기록을 하지 않습니다.</div>
              ) : (
                history
              )}
            </Panel>
          );
        })}
      </Collapse>
    </Wrapper>
  );
}
const sidePadding = 30;
const Wrapper = styled.div`
  .ant-collapse-content-box {
    padding: 5px;

    div {
      text-align: center;
      color: #7d7d7d;
      margin: 10px 0;
    }
  }

  .percentage {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
  }

  .numbers {
    span {
      /* padding: 0 10px; */
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

    .numbers-wrapper {
      padding: 0 6px;
      background: #e2e2e2;
      border-radius: 11px;
      margin: 6px 6px;

      span {
        padding: 0 2.5px;
      }

      .corrected {
        background-color: #5c5cea;
        color: white;
        border-radius: 13px;
        display: inline-block;
        width: 24px;
        border: 1px solid #adadad;
        text-align: center;
      }
    }
  }

  .splitter {
    height: 10px;
    width: 1px;
    background-color: #dadada;
  }
`;

export default CorrectedNumber;
