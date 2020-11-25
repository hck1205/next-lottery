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
    <>
      <Select
        value={rangeStartNum}
        defaultValue={1}
        onChange={(value) => {
          setRangeStartNum(value);
          resetGame();
        }}
        style={{ width: 70 }}
        disabled={gameStart}
      >
        {[...Array(99)].map((_, index) => {
          return (
            <Option key={`range_start_num_${index}`} value={index + 1}>
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
        style={{ width: 70 }}
        disabled={gameStart}
      >
        {[...Array(99 - rangeStartNum)].map((_, index) => {
          return (
            <Option
              key={`range_end_num_${index}`}
              value={index + rangeStartNum + 1}
            >
              {index + rangeStartNum + 1}
            </Option>
          );
        })}
      </Select>
    </>
  );
}

export default LotteryNumberRange;
