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
  langpack: any;
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
  langpack,
}: Props) {
  return (
    <Wrapper>
      <div className={'switchWrapper'}>
        <span>{title}</span>
        <Switch
          defaultChecked
          checkedChildren={langpack.auto}
          unCheckedChildren={langpack.manual}
          onChange={(isGenAuto) => {
            isGenAuto && setGenNumList([]);
            setGenNumType(isGenAuto);
          }}
          checked={checked}
          size={'default'}
          disabled={gameStart}
          style={{
            minWidth: 58,
          }}
        />
      </div>
      <div className={'selectWrapper'}>
        {gameStart &&
          !checked &&
          genNumList.length < numberOfInputs &&
          genNumList.length !== 0 && <p>Semi-Auto</p>}
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', textAlign: 'center' }}
          placeholder={checked ? '' : langpack.selectDesc}
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
      </div>
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
    padding-right: 20px;
    width: 80px;
    align-items: center;
    text-align: center;

    span {
      font-weight: bold;
    }
  }

  .selectWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;

    p {
      padding: 0;
      margin: 0;
      font-size: 11px;
      color: #ea3434;
      font-weight: bold;
    }
    .ant-select-selector {
      padding: 0 5px;

      .ant-select-selection-item {
        padding: 0 5px;
      }
    }
  }
`;

export default LotteryNumberMethod;
