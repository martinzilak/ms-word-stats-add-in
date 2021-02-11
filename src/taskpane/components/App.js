import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { useCallback, useState } from 'react';
import * as React from "react";
import { Button, ButtonType, SpinButton, TextField } from "office-ui-fabric-react";
import { GoalUnit } from '../constants/GoalUnit';
import { getMotivationalQuote } from '../utils/getMotivationalQuote';
import Header from "./Header";
import Loading from "./Loading";
import ProgressBar from './ProgressBar';
/* global Button Header, HeroList, HeroListItem, Progress, Word */

const App = ({ title, isOfficeInitialized }) => {
  const [isCalculatedAtLeastOnce, setIsCalculatedAtLeastOnce] = useState(false);

  const [goalNumber, setGoalNumber] = useState(1);
  const [goalUnit, setGoalUnit] = useState(null);

  const [letterCount, setLetterCount] = useState(0); // FontColorA
  const [wordCount, setWordCount] = useState(0); // TextOverflow
  const [paragraphCount, setParagraphCount] = useState(0); // PageList
  const [pageCount, setPageCount] = useState(0) // Copy

  const [progress, setProgress] = useState(null);
  const [quote, setQuote] = useState(null);

  const calculate = async () => {
    return Word.run(async context => {
      /**
       * Insert your Word code here
       */

      // const document = context.document.body;
      const body = context.document.body;

      // context.load(document, [Word.BreakType.page]);
      context.load(body, ['text', 'paragraphs']);
      await context.sync();

      const text = body.text;
      const splitText = text.split(/\s+/);

      const letters = splitText.join('').length;
      const words = splitText.length;
      const paragraphs = body.paragraphs.items.length;
      // const pages = body.text.split(/\f/g).length + 1;

      let goalValue = 0;
      if (goalUnit === GoalUnit.LETTER) {
        goalValue = letters;
      }
      if (goalUnit === GoalUnit.WORD) {
        goalValue = words;
      }
      if (goalUnit === GoalUnit.PARAGRAPH) {
        goalValue = paragraphs;
      }
      if (goalUnit === GoalUnit.PAGE) {
        goalValue = 0;
      }

      setLetterCount(letters);
      setWordCount(words);
      setParagraphCount(paragraphs);
      setPageCount(0);

      if (goalNumber > 0 && goalValue > 0) {
        setProgress(Math.round(goalValue / goalNumber * 100));
      } else {
        setProgress(null);
      }

      setQuote(getMotivationalQuote());

      setIsCalculatedAtLeastOnce(true);
    });
  };

  if (!isOfficeInitialized) {
    return (
        <Loading title={title} logo="assets/logo-filled.png" message="Please sideload your add-in to see app body." />
    );
  }

  return (
      <div className="ms-welcome">
        <Header logo="assets/logo-filled.png" title={title} message="Welcome" />
        <main className="ms-welcome__main">
          <h2 className="ms-font-l ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
            Set your goal:
          </h2>

          <div className="goal-input">
            <SpinButton
                placeholder="Goal value"
                value={`${goalNumber}`}
                min={1}
                step={1}
                onIncrement={(value) => {
                  const parsedNumber = parseInt(value, 10);
                  if (parsedNumber) {
                    setGoalNumber(parsedNumber + 1);
                  }
                }}
                onDecrement={(value) => {
                  const parsedNumber = parseInt(value, 10);
                  if (parsedNumber && parsedNumber > 1) {
                    setGoalNumber(parsedNumber - 1);
                  }
                }}
                onValidate={(value) => {
                  const parsedNumber = parseInt(value, 10);
                  if (parsedNumber && parsedNumber > 0) {
                    setGoalNumber(parsedNumber);
                  }
                }}
            />

            <Dropdown
                placeholder="Goal unit"
                selectedKey={goalUnit}
                onChange={(_, item) => {
                  setGoalUnit(item.key);
                }}
                options={[
                  { key: GoalUnit.LETTER, text: 'Letter(s)' },
                  { key: GoalUnit.WORD, text: 'Word(s)' },
                  { key: GoalUnit.PARAGRAPH, text: 'Paragraph(s)' },
                  { key: GoalUnit.PAGE, text: 'Page(s)', }
                ]}
            />
          </div>

          <br />

          <Button
              className="ms-welcome__action"
              buttonType={ButtonType.hero}
              iconProps={{ iconName: "ChevronRight" }}
              onClick={calculate}
          >
            Calculate
          </Button>

          <br />
          <hr style={{ width: '100%' }} />

          {isCalculatedAtLeastOnce ? (
              <>
                {progress != null && (
                    <>
                      <span className="ms-font-l ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
                        Your progress:
                      </span>

                      <ProgressBar progress={progress} />

                      {`${progress}%`}

                      <br />
                      <hr style={{ width: '100%' }} />
                    </>
                )}

                <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">
                  <li className="ms-ListItem">
                    <i className="ms-Icon ms-Icon--FontColorA"></i>
                    <span className="ms-font-m ms-fontColor-neutralPrimary">
                      {`Letter count: ${letterCount > 0 ? letterCount : '-'}`}
                    </span>
                  </li>

                  <li className="ms-ListItem">
                    <i className="ms-Icon ms-Icon--TextOverflow"></i>
                    <span className="ms-font-m ms-fontColor-neutralPrimary">
                      {`Word count: ${wordCount > 0 ? wordCount : '-'}`}
                    </span>
                  </li>

                  <li className="ms-ListItem">
                    <i className="ms-Icon ms-Icon--PageList"></i>
                    <span className="ms-font-m ms-fontColor-neutralPrimary">
                      {`Paragraph count: ${paragraphCount > 0 ? paragraphCount : '-'}`}
                    </span>
                  </li>

                  <li className="ms-ListItem">
                    <i className="ms-Icon ms-Icon--Copy"></i>
                    <span className="ms-font-m ms-fontColor-neutralPrimary">
                      {`Page count: ${pageCount > 0 ? pageCount : '-'}`}
                    </span>
                  </li>
                </ul>

                {quote != null && (
                    <>
                      <hr style={{ width: '100%' }} />

                      <span className="ms-font-l ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
                        {quote.QUOTE}
                      </span>

                      <span className="ms-font-s ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
                        {`-- ${quote.AUTHOR}`}
                      </span>
                    </>
                )}
              </>
          ) : (
              <p className="ms-font-l">
                Click <b>Calculate</b> at least once to see the magic happen.
              </p>
          )}
        </main>
      </div>
  );
};

export default App;
