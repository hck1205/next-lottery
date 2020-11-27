import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <title>Lottery Simulator</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Do you want to know your lucky number? Simulate random lottery number and check out magic numbers"
        />
        <meta
          name="keywords"
          content="로또, 당첨번호, 로또당첨번호, 로또 당첨번호, Lottery, Lottery win number, lottery simulator, 로또 시뮬레이터, 로또 자동, auto lottery, automatic lottery, magic number, 행운의 숫자, 럭키넘버, 럭키숫자, 로또 자동번호, 로또 확률, lottery percetance, chance of winning, lottery won price, 로또 상금 금액, 로또 금액, 로또 1등, lottery simulator"
        ></meta>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
