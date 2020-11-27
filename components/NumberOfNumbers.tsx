import styled from '@emotion/styled';

import { Select } from 'antd';

const { Option } = Select;

type Props = {
  numberOfInputs: number;
  setNumberOfInputs: Function;
  resetGame: Function;
  gameStart: boolean;
};

function LotteryNumberOfNumbers({
  numberOfInputs,
  setNumberOfInputs,
  resetGame,
  gameStart,
}: Props) {
  return (
    <Wrapper>
      <Select
        value={numberOfInputs}
        defaultValue={5}
        onChange={(value) => {
          setNumberOfInputs(value);
          resetGame();
        }}
        style={{ width: '100%' }}
        disabled={gameStart}
      >
        {[...Array(3)].map((_, index) => {
          const value = index + 5;
          return (
            <Option
              key={`select_option_${index}`}
              className={'option'}
              value={value}
              style={{
                textAlign: 'center',
              }}
            >
              {value}
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

  .option {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 25px;
  }
`;

export default LotteryNumberOfNumbers;
