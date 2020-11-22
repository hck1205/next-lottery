import React, { useEffect, useRef, useState } from 'react';
import { Select, Switch, Button } from 'antd';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import 'antd/dist/antd.css';

const { Option } = Select;

type Props = {};

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

let gameCount = 0;
let periodDay = 0;
let numberOfTimesOfCorrection: { [key: string]: any } = {};
const costForOneTry = 1000;

function Lottery({}: Props) {
  const [rangeStartNum, setRangeStartNum] = useState(1);
  const [rangeEndNum, setRangeEndNum] = useState(45);
  const [numberOfInputs, setNumberOfInputs] = useState(5);

  const [genWinNumType, setGenWinNumType] = useState(true);
  const [genWinNumList, setGenWinNumList] = useState<number[]>([]);

  const [genBuyNumType, setGenBuyNumType] = useState(true);
  const [genBuyNumList, setGenBuyNumList] = useState<number[]>([]);

  const [gameStart, setGameStart] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  // 게임 횟수
  const gameCountText = useRef<HTMLDivElement>(null);

  // 기간
  const periodDayText = useRef<HTMLDivElement>(null);
  const periodMonthText = useRef<HTMLDivElement>(null);
  const periodYearText = useRef<HTMLDivElement>(null);

  // 당첨번호
  const winNumberText = useRef<HTMLDivElement>(null);
  const buyNumberText = useRef<HTMLDivElement>(null);

  //투자금
  const moneySpendOnBuying = useRef<HTMLDivElement>(null);

  const startGame = () => {
    const updateText: any = setInterval(() => {
      let winNumber: number[] = genWinNumList;
      let buyNumber: number[] = genBuyNumList;
      //  게임 횟수
      if (gameCountText.current) {
        gameCountText.current.innerHTML = ` ${++gameCount}`;
      }

      if (periodDayText.current) {
        if (gameCount % 5 === 0) {
          periodDayText.current.innerHTML = ` ${(periodDay += 7)}일`;
        }
      }

      if (periodMonthText.current) {
        const value = Math.floor(periodDay / 30);
        if (value > 0) periodMonthText.current.innerHTML = ` ${value}개월`;
      }

      if (periodYearText.current) {
        const value = Math.floor(periodDay / 365);
        if (value > 0)
          periodYearText.current.innerHTML = ` ${Math.floor(
            periodDay / 365
          )}년`;
      }

      if (genWinNumType) {
        winNumber = getRandomNum();
        if (winNumberText.current) {
          winNumberText.current.innerHTML = JSON.stringify(winNumber);
        }
      }

      if (genBuyNumType) {
        buyNumber = getRandomNum();
        if (buyNumberText.current) {
          buyNumberText.current.innerHTML = JSON.stringify(buyNumber);
        }
      }

      if (winNumber.length > 0 && buyNumber.length > 0) {
        let correctCnt = 0;
        for (let i = 0; i < winNumber.length; i++) {
          for (let j = 0; j < buyNumber.length; j++) {
            if (winNumber[i] === buyNumber[j]) ++correctCnt;
          }
        }

        // 맞춘 숫자 개수 업데이트
        numberOfTimesOfCorrection[
          `${correctCnt}_corrected`
        ] = ++numberOfTimesOfCorrection[`${correctCnt}_corrected`];

        if (correctCnt > 2) {
          const correctHistory = document.getElementById(
            `category__sub__history__${correctCnt}`
          );
          if (correctHistory) {
            correctHistory.innerHTML += `<span>${JSON.stringify(
              buyNumber
            )}</span>`;
          }
        }

        for (let i = 0; i <= numberOfInputs; i++) {
          const correctPercentage = document.getElementById(
            `category__sub__percentage__${i}`
          );

          const correctedCnt = numberOfTimesOfCorrection[`${i}_corrected`];

          if (correctPercentage) {
            const percentage = (100 * correctedCnt) / gameCount;
            correctPercentage.innerHTML = `<div>${percentage} %</div> <div>${correctedCnt} 회</div>`;
          }
        }
      }

      // 투자금
      if (moneySpendOnBuying.current) {
        moneySpendOnBuying.current.innerHTML = `${(
          gameCount * costForOneTry
        ).toLocaleString('ko-KR')}원`;
      }
    }, 20);
    setGameStart(true);
    setIntervalId(updateText);
  };

  const stopGame = () => {
    setGameStart(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const resetGame = () => {
    if (!gameStart) {
      gameCount = 0;
      periodDay = 0;

      for (let i = 0; i <= numberOfInputs; i++) {
        const correctPercentage = document.getElementById(
          `category__sub__percentage__${i}`
        );
        const correctHistory = document.getElementById(
          `category__sub__history__${i}`
        );

        if (correctPercentage) {
          correctPercentage.innerHTML = '';
        }

        if (correctHistory) {
          correctHistory.innerHTML = '';
        }

        numberOfTimesOfCorrection[`${i}_corrected`] = 0;
      }

      if (winNumberText.current) {
        winNumberText.current.innerHTML = '';
      }
      if (buyNumberText.current) {
        buyNumberText.current.innerHTML = '';
      }
      if (gameCountText.current) {
        gameCountText.current.innerHTML = '';
      }
      if (periodDayText.current) {
        periodDayText.current.innerHTML = '';
      }
      if (periodMonthText.current) {
        periodMonthText.current.innerHTML = '';
      }
      if (periodYearText.current) {
        periodYearText.current.innerHTML = '';
      }

      // setRangeStartNum(1);
      // setRangeEndNum(45);
      // setNumberOfInputs(5);
      setGenWinNumType(true);
      setGenWinNumList([]);
      setGenBuyNumType(true);
      setGenBuyNumList([]);
      setGameStart(false);
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  };

  const getRandomNum = () => {
    const numberList = [];
    while (numberList.length !== numberOfInputs) {
      const number = Math.round(Math.random() * rangeEndNum);
      if (numberList.indexOf(number) < 0) {
        numberList.push(number);
      }
    }
    return numberList;
  };

  useEffect(() => {
    for (let i = 0; i <= numberOfInputs; i++) {
      numberOfTimesOfCorrection[`${i}_corrected`] = 0;
    }
  }, [numberOfInputs]);

  return (
    <PageWrapper>
      <ContentWrapper></ContentWrapper>
      <ConfigTable>
        <tbody>
          <tr>
            <td colSpan={5}>
              <StatisticsWrapper>
                <ul>
                  <li>
                    게임 횟수:
                    <span ref={gameCountText}>{` ${gameCount}`}</span>
                  </li>

                  {genWinNumType && (
                    <li>
                      당첨 로또 생성번호: <span ref={winNumberText} />
                    </li>
                  )}
                  {genBuyNumType && (
                    <li>
                      구입 로또 생성번호: <span ref={buyNumberText} />
                    </li>
                  )}
                </ul>

                <ul>
                  <li>
                    <span>투자금: </span>
                    <span ref={moneySpendOnBuying} />
                  </li>
                  {/* <li>수익금:</li> */}

                  <li>
                    <span>기간: </span>
                    <span ref={periodDayText}>{` ${periodDay}일`}</span>
                    <span ref={periodMonthText} />
                    <span ref={periodYearText} />
                    <p>(일주일에 5장 구매시)</p>
                  </li>
                </ul>
              </StatisticsWrapper>
            </td>
          </tr>
          <tr>
            <td colSpan={5}>
              <ButtonWrapper>
                <Button
                  type="primary"
                  onClick={() => {
                    if (
                      (!genBuyNumType &&
                        genBuyNumList.length === numberOfInputs) ||
                      (!genWinNumType &&
                        genWinNumList.length === numberOfInputs) ||
                      (genBuyNumType && genWinNumType)
                    ) {
                      startGame();
                    }
                  }}
                  block
                >
                  시작
                </Button>

                <Button
                  type="default"
                  onClick={() => {
                    stopGame();
                  }}
                  block
                  danger
                >
                  정지
                </Button>
                <Button type="default" onClick={() => resetGame()} block>
                  초기화
                </Button>
              </ButtonWrapper>
            </td>
          </tr>
          {/* 숫자 범위 */}
          <tr>
            <td id="category__main">로또 번호</td>
            <td id="category__sub">숫자 범위</td>
            <td>
              <div id="content">
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
                      <Option
                        key={`range_start_num_${index}`}
                        value={index + 1}
                      >
                        {index + 1}
                      </Option>
                    );
                  })}
                </Select>
                ~
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
              </div>
            </td>

            <td id="category__sub">숫자 갯수</td>
            <td>
              <div id="content">
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
              </div>
            </td>
          </tr>

          {/* 당첨번호 */}
          <tr>
            <td id={'category__main'}>당첨 번호</td>
            <td id={'category__sub'}>생성방법</td>
            <td>
              <div id="content">
                <Switch
                  defaultChecked
                  checkedChildren="자동"
                  unCheckedChildren="수동"
                  onChange={(isGenAuto) => {
                    isGenAuto && setGenWinNumList([]);
                    setGenWinNumType(isGenAuto);
                  }}
                  checked={genWinNumType}
                  size={'default'}
                  disabled={gameStart || !genBuyNumType}
                />
              </div>
            </td>

            <td id={'category__sub'}>입력</td>
            <td>
              <div id="content">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ minWidth: 250 }}
                  placeholder={genWinNumType ? '' : '당첨 번호를 선택해주세요.'}
                  value={genWinNumList}
                  onChange={(selectedList) => {
                    if (selectedList.length <= numberOfInputs) {
                      setGenWinNumList(selectedList);
                    }
                  }}
                  disabled={gameStart || genWinNumType}
                >
                  {getSelectOptionList({ rangeStartNum, rangeEndNum })}
                </Select>
              </div>
            </td>
          </tr>

          {/* 구입번호 */}
          <tr>
            <td id={'category__main'}>구입 번호</td>
            <td id={'category__sub'}>생성방법</td>
            <td>
              <div id="content">
                <Switch
                  defaultChecked
                  checkedChildren="자동"
                  unCheckedChildren="수동"
                  onChange={(isGenAuto) => {
                    isGenAuto && setGenBuyNumList([]);
                    setGenBuyNumType(isGenAuto);
                  }}
                  checked={genBuyNumType}
                  disabled={gameStart || !genWinNumType}
                />
              </div>
            </td>

            <td id={'category__sub'}>입력</td>
            <td>
              <div id="content">
                <Select
                  mode="multiple"
                  allowClear
                  style={{ minWidth: 250 }}
                  placeholder={
                    genBuyNumType ? '' : '구매하실 로또번호를 선택해주세요.'
                  }
                  value={genBuyNumList}
                  onChange={(selectedList) => {
                    if (selectedList.length <= numberOfInputs) {
                      setGenBuyNumList(selectedList);
                    }
                  }}
                  disabled={gameStart || genBuyNumType}
                >
                  {getSelectOptionList({ rangeStartNum, rangeEndNum })}
                </Select>
              </div>
            </td>
          </tr>
          <tr>
            <td id={'category__main'}>적중한 갯수</td>
            <td id={'category__sub'} colSpan={2}>
              적중 확률
            </td>
            <td id={'category__sub'} colSpan={2}>
              적중한 숫자기록
            </td>
          </tr>
          {[...Array(numberOfInputs + 1)].map((_, index) => {
            return (
              <tr key={`target_number_${index}`}>
                <td id={'category__sub'}>{`${
                  numberOfInputs - index
                }개 맞춤`}</td>
                <td colSpan={2}>
                  <div
                    className="percentage"
                    id={`category__sub__percentage__${numberOfInputs - index}`}
                  />
                </td>
                <td
                  colSpan={2}
                  id={`${3 > numberOfInputs - index ? 'gray' : 'white'}`}
                >
                  <div
                    className="history"
                    id={`category__sub__history__${numberOfInputs - index}`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </ConfigTable>
    </PageWrapper>
  );
}

const FLEX_CONTER = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div``;

const PageWrapper = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: auto;
  padding: 50px 0;
`;

const ConfigTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  tr,
  td {
    border: 1px solid #dedede;
    max-width: 300px;
    height: 150px;

    &#category__main {
      width: 150px;
      height: 100px;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
    }

    &#category__sub {
      width: 150px;
      height: 100px;
      font-size: 14px;
      text-align: center;
    }

    .percentage {
      text-align: center;
    }

    .history {
      overflow: auto;
      max-height: 150px;
      padding: 0 20px;

      span {
        padding: 10px 15px;
        display: inline-block;
      }
    }

    &#gray {
      background-color: #f5f5f5;
    }

    #content {
      ${FLEX_CONTER}
      /* padding: 0 10px; */

      input {
        width: 40px;
        margin: 0 2px;
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  ${FLEX_CONTER}

  button {
    width: 100%;
    height: 50px;
  }
`;

const StatisticsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;

  ul {
    list-style-type: none;
    width: 100%;

    li {
      margin: 10px 0;
      font-weight: bold;
      p {
        font-size: 12px;
        color: #888888;
      }
    }
  }
`;

export default Lottery;
