import styled from '@emotion/styled';

import { Select } from 'antd';

const { Option } = Select;

type Props = {
  rangeStartNum: number;
  setRangeStartNum: Function;
  resetGame: Function;
  gameStart: boolean;
  rangeEndNum: number;
  setRangeEndNum: Function;
};

function LotteryNumberRange({
  rangeStartNum,
  setRangeStartNum,
  resetGame,
  gameStart,
  rangeEndNum,
  setRangeEndNum,
}: Props) {
  return (
    <Wrapper>
      <Select
        value={rangeStartNum}
        defaultValue={1}
        onChange={(value) => {
          setRangeStartNum(value);
          resetGame();
        }}
        style={{ width: '100%' }}
        disabled={gameStart}
      >
        {[...Array(99)].map((_, index) => {
          return (
            <Option
              key={`range_start_num_${index}`}
              value={index + 1}
              style={{
                textAlign: 'center',
              }}
            >
              {index + 1}
            </Option>
          );
        })}
      </Select>
      {` ~ `}
      <Select
        value={rangeEndNum}
        defaultValue={1}
        onChange={(value) => {
          setRangeEndNum(value);
          resetGame();
        }}
        style={{ width: '100%' }}
        disabled={gameStart}
      >
        {[...Array(99 - rangeStartNum)].map((_, index) => {
          return (
            <Option
              key={`range_end_num_${index}`}
              value={index + rangeStartNum + 1}
              style={{
                textAlign: 'center',
              }}
            >
              {index + rangeStartNum + 1}
            </Option>
          );
        })}
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;

export default LotteryNumberRange;
