import styled from '@emotion/styled';

import { Select, Switch } from 'antd';

const { Option } = Select;

const getSelectOptionList = ({
  rangeStartNum,
  rangeEndNum,
}: {
  rangeStartNum: number;
  rangeEndNum: number;
}) => {
  const children: JSX.Element[] = [];
  for (let i = rangeStartNum; i <= rangeEndNum; i++) {
    children.push(
      <Option value={i} key={i}>
        {i}
      </Option>
    );
  }
  return children;
};

type Props = {
  title: string;
  setGenNumList: Function;
  genNumList: number[];
  numberOfInputs: number;
  setGenNumType: Function;
  rangeStartNum: number;
  rangeEndNum: number;
  checked: boolean;
  gameStart: boolean;
};

function LotteryNumberMethod({
  title,
  setGenNumList,
  genNumList,
  numberOfInputs,
  setGenNumType,
  rangeStartNum,
  rangeEndNum,
  checked,
  gameStart,
}: Props) {
  return (
    <Wrapper>
      <div className={'switchWrapper'}>
        <span>{title}</span>
        <Switch
          defaultChecked
          checkedChildren="자동"
          unCheckedChildren="수동"
          onChange={(isGenAuto) => {
            isGenAuto && setGenNumList([]);
            setGenNumType(isGenAuto);
          }}
          checked={checked}
          size={'default'}
          disabled={gameStart}
          style={{
            marginRight: 20,
            minWidth: 58,
          }}
        />
      </div>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder={checked ? '' : '번호를 선택해주세요.'}
        value={genNumList}
        onChange={(selectedList) => {
          if (selectedList.length <= numberOfInputs) {
            setGenNumList(selectedList);
          }
        }}
        disabled={gameStart || checked}
      >
        {getSelectOptionList({ rangeStartNum, rangeEndNum })}
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .switchWrapper {
    display: flex;
    flex-direction: column;

    span {
      font-weight: bold;
    }
  }
`;

export default LotteryNumberMethod;
