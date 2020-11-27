import React, { useEffect, useRef, useState } from 'react';
import { Select, Button } from 'antd';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import LotteryNumberRange from '../components/NumberRange';
import LotteryNumberOfNumbers from '../components/NumberOfNumbers';
import LotteryNumberMethod from '../components/NumberMethod';
import CorrectedNumber from '../components/CorrectedNumber';
import LangPack from '../langpack';

import 'antd/dist/antd.css';

const { Option } = Select;

let gameCount = 0;
let periodDay = 0;
let numberOfTimesOfCorrection: { [key: string]: any } = {};

function Lottery() {
  const [lang, setLang] = useState('EN');

  const [rangeStartNum, setRangeStartNum] = useState(1);
  const [rangeEndNum, setRangeEndNum] = useState(45);
  const [numberOfInputs, setNumberOfInputs] = useState(5);

  const [genWinNumType, setGenWinNumType] = useState(true); // true 자동, false 수동
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

  const L = LangPack[lang];

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
          periodDayText.current.innerHTML = ` ${(periodDay += 7)} ${L.day}`;
        }
      }

      if (periodMonthText.current) {
        const value = Math.floor(periodDay / 30);
        if (value > 0)
          periodMonthText.current.innerHTML = ` ${value} ${L.month}`;
      }

      if (periodYearText.current) {
        const value = Math.floor(periodDay / 365);
        if (value > 0)
          periodYearText.current.innerHTML = ` ${Math.floor(periodDay / 365)} ${
            L.year
          }`;
      }

      // if (genWinNumType) { // 자동이면
      winNumber = getRandomNum('win');
      if (winNumberText.current) {
        winNumberText.current.innerHTML = winNumber.join(' ');
      }
      // }

      // if (genBuyNumType) {
      buyNumber = getRandomNum('buy');
      if (buyNumberText.current) {
        buyNumberText.current.innerHTML = buyNumber.join(' ');
      }
      // }

      if (winNumber.length > 0 && buyNumber.length > 0) {
        let correctCnt = 0;
        let correctIndexList = [];
        for (let i = 0; i < winNumber.length; i++) {
          for (let j = 0; j < buyNumber.length; j++) {
            if (winNumber[i] === buyNumber[j]) {
              ++correctCnt;
              correctIndexList.push(j);
            }
          }
        }

        // 맞춘 숫자 개수 업데이트
        numberOfTimesOfCorrection[
          `${correctCnt}_corrected`
        ] = ++numberOfTimesOfCorrection[`${correctCnt}_corrected`];

        if (correctCnt > Math.floor(numberOfInputs / 2)) {
          const correctHistory = document.getElementById(
            `category__sub__history__${correctCnt}`
          );
          if (correctHistory) {
            let dynamicInnerHtml = "<div class='numbers-wrapper'>";

            for (let i = 0; i < buyNumber.length; i++) {
              dynamicInnerHtml += `<span class=${
                correctIndexList.indexOf(i) > -1 ? 'corrected' : 'incorrected'
              }>${buyNumber[i]}</span>`;
            }
            dynamicInnerHtml += '</div>';
            correctHistory.innerHTML += dynamicInnerHtml;
          }
        }

        for (let i = 0; i <= numberOfInputs; i++) {
          const correctPercentage = document.getElementById(
            `category__sub__percentage__${i}`
          );

          const correctedCnt = numberOfTimesOfCorrection[`${i}_corrected`];
          if (correctPercentage) {
            const percentage = (100 * correctedCnt) / gameCount;

            correctPercentage.innerHTML = `<div>${percentage.toFixed(
              5
            )} %</div>`;
          }

          const correctedCntEle = document.getElementById(
            `category__sub__corrected__cnt__${i}`
          );

          if (correctedCntEle) {
            correctedCntEle.innerHTML = `<div>${correctedCnt} ${L.count}</div>`;
          }
        }
      }

      // 투자금
      if (moneySpendOnBuying.current) {
        let currency = '';

        if (lang === 'KO') {
          currency = `${(gameCount * 1000).toLocaleString('ko-KR')} ${
            L.currency
          }`;
        } else {
          currency = `${(gameCount * 2).toLocaleString('en-EN')} ${L.currency}`;
        }

        console.log('currency', currency);

        moneySpendOnBuying.current.innerHTML = currency;
      }
    }, 50);
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
        const correctedCntEle = document.getElementById(
          `category__sub__corrected__cnt__${i}`
        );

        if (correctPercentage) {
          correctPercentage.innerHTML = '';
        }
        if (correctedCntEle) {
          correctedCntEle.innerHTML = '';
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
      if (moneySpendOnBuying.current) {
        moneySpendOnBuying.current.innerHTML = '';
      }

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

  const getRandomNum = (type) => {
    let genType, selectedNmberList;

    genType = type === 'win' ? genWinNumType : genBuyNumType;
    selectedNmberList = type === 'win' ? genWinNumList : genBuyNumList;

    // const isSemiAuto = !genType && selectedNmberList.length < numberOfInputs;
    const numberList = [...selectedNmberList];

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
      <ContentWrapper>
        <ul>
          <li>
            <h1>{L.status}</h1>

            <StatisticsWrapper>
              <ul>
                <li>
                  {L.gameCount}:
                  <span ref={gameCountText}>{` ${gameCount}`}</span>
                </li>
                <li>
                  <span>{L.totalSpendMoney}:</span>
                  <div ref={moneySpendOnBuying} />
                </li>
                {/* <li>수익금:</li> */}

                <li>
                  {L.genWinLottryNum}:
                  <div
                    className={'statistic-lottery-number'}
                    ref={winNumberText}
                  />
                </li>

                <li>
                  {L.genBuyLottryNum}:
                  <div
                    className={'statistic-lottery-number'}
                    ref={buyNumberText}
                  />
                </li>
              </ul>

              <ul>
                <li>
                  <span>{L.language}:</span>
                  <div>
                    <Select
                      defaultValue="EN"
                      style={{ width: 120 }}
                      onChange={(value) => {
                        setLang(value);
                      }}
                    >
                      <Option value="EN">{L.langEn}</Option>
                      <Option value="KO">{L.langKo}</Option>
                    </Select>
                  </div>
                </li>
                <li>
                  <span>{L.period}</span>
                  <p>({L.periodDesc})</p>
                  <div ref={periodDayText} />
                  <div ref={periodMonthText} />
                  <div ref={periodYearText} />
                </li>
              </ul>
            </StatisticsWrapper>
          </li>
          <li>
            <ButtonWrapper>
              <Button
                type="primary"
                onClick={() => {
                  if (
                    (!genBuyNumType && genBuyNumList.length > 0) ||
                    (!genWinNumType && genWinNumList.length > 0) ||
                    (genBuyNumType && genWinNumType)
                  ) {
                    !gameStart && startGame();
                  }
                }}
                block
              >
                {L.start}
              </Button>

              <Button
                type="default"
                onClick={() => {
                  stopGame();
                }}
                block
                danger
              >
                {L.stop}
              </Button>
              <Button type="default" onClick={() => resetGame()} block>
                {L.reset}
              </Button>
            </ButtonWrapper>
          </li>
          <li>
            <h1>{L.configLotteryNum}</h1>
            <div className="contents">
              <h2>{L.numberRange}</h2>
              <LotteryNumberRange
                rangeStartNum={rangeStartNum}
                setRangeStartNum={setRangeStartNum}
                resetGame={resetGame}
                gameStart={gameStart}
                rangeEndNum={rangeEndNum}
                setRangeEndNum={setRangeEndNum}
              />
            </div>

            <div className="contents">
              <h2>{L.numberCount}</h2>
              <LotteryNumberOfNumbers
                numberOfInputs={numberOfInputs}
                setNumberOfInputs={setNumberOfInputs}
                resetGame={resetGame}
                gameStart={gameStart}
              />
            </div>

            <div className="contents">
              <LotteryNumberMethod
                title={L.winNumber}
                setGenNumList={setGenWinNumList}
                genNumList={genWinNumList}
                numberOfInputs={numberOfInputs}
                setGenNumType={setGenWinNumType}
                rangeStartNum={rangeStartNum}
                rangeEndNum={rangeEndNum}
                checked={genWinNumType}
                gameStart={gameStart}
                langpack={L}
              />
            </div>

            <div className="contents">
              <LotteryNumberMethod
                title={L.buyNumber}
                setGenNumList={setGenBuyNumList}
                genNumList={genBuyNumList}
                numberOfInputs={numberOfInputs}
                setGenNumType={setGenBuyNumType}
                rangeStartNum={rangeStartNum}
                rangeEndNum={rangeEndNum}
                checked={genBuyNumType}
                gameStart={gameStart}
                langpack={L}
              />
            </div>
          </li>

          <li>
            <h1>{L.correctionHistory}</h1>
            <CorrectedNumber numberOfInputs={numberOfInputs} langpack={L} />
          </li>
        </ul>
      </ContentWrapper>
    </PageWrapper>
  );
}

const sidePadding = 30;

const FLEX_CONTER = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  background-color: #fff;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      h1 {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        border-bottom: 1px solid #dedede;
        padding: 0 ${sidePadding - 5}px;
        margin: 0;
        height: 50px;
        line-height: 50px;
        background-color: #ececec;
        color: #353535;

        @media only screen and (max-width: 768px) {
          padding: 0 15px;
        }
      }

      .contents {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px ${sidePadding}px;

        @media only screen and (max-width: 768px) {
          padding: 10px 20px;
        }

        h2 {
          font-weight: bold;
          padding: 0;
          margin: 0;
          font-size: 14px;
        }
      }
    }
  }
`;

const PageWrapper = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: auto;
  background-color: #f2f4f7;
`;

const ButtonWrapper = styled.div`
  ${FLEX_CONTER}

  button {
    width: 100%;
    height: 50px;
    margin: 10px 0;
  }
`;

const StatisticsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px ${sidePadding}px;
  border: 1px solid #dcdada;
  border-radius: 7px;
  margin: 10px 10px 0;

  @media only screen and (max-width: 768px) {
    padding: 10px 10px;
  }

  ul {
    list-style-type: none;

    li {
      margin: 10px 0;
      font-weight: bold;

      p {
        font-size: 12px;
        color: #888888;
        margin: 0;
      }

      div {
        margin: 5px 0;
      }
    }

    .statistic-lottery-number {
      text-align: center;
      border: 1px solid #cacaca;
      border-radius: 5px;
      color: #1890ff;
      height: 25px;
    }
  }
`;

export default Lottery;
