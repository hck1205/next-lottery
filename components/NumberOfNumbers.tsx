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
    <Select
      value={numberOfInputs}
      defaultValue={5}
      onChange={(value) => {
        setNumberOfInputs(value);
        resetGame();
      }}
      style={{ width: 70 }}
      disabled={gameStart}
    >
      {[...Array(3)].map((_, index) => {
        const value = index + 5;
        return (
          <Option key={`range_end_num_${index}`} value={value}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
}
export default LotteryNumberOfNumbers;
