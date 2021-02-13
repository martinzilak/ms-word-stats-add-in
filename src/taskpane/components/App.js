import React, { useState } from "react";
import { Button, ButtonType, SpinButton, Dropdown } from "office-ui-fabric-react";
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import { CustomProperty } from '../constants/CustomProperty';
import { getValueByUnit, Unit } from '../constants/Unit';
import { getMotivationalQuote } from '../utils/getMotivationalQuote';
import Header from "./Header";
import Loading from "./Loading";
import Progress from './Progress';
import Quote from './Quote';
import Statistics from './Statistics';
/* global Button Header, HeroList, HeroListItem, Progress, Word */

const App = ({ title, isOfficeInitialized }) => {
  const [isCalculatedAtLeastOnce, setIsCalculatedAtLeastOnce] = useState(false);

  const [goalValue, setGoalValue] = useState(1);
  const [goalUnit, setGoalUnit] = useState(null);

  const [pageValue, setPageValue] = useState(1);
  const [pageUnit, setPageUnit] = useState(null);

  const [letterCount, setLetterCount] = useState(0); // FontColorA
  const [letterWithSpacesCount, setLetterWithSpacesCount] = useState(0); // FontColorA
  const [wordCount, setWordCount] = useState(0); // TextOverflow
  const [paragraphCount, setParagraphCount] = useState(0); // PageList
  const [pageCount, setPageCount] = useState(0) // Copy

  const [progress, setProgress] = useState(null);
  const [quote, setQuote] = useState(null);

  Office.onReady(async () => {
    return Word.run(async (context) => {
      const loadedGoalUnit = context.document.properties.customProperties.getItemOrNullObject(CustomProperty.GOAL_UNIT);
      const loadedGoalValue = context.document.properties.customProperties.getItemOrNullObject(CustomProperty.GOAL_VALUE);
      const loadedPageUnit = context.document.properties.customProperties.getItemOrNullObject(CustomProperty.PAGE_UNIT);
      const loadedPageValue = context.document.properties.customProperties.getItemOrNullObject(CustomProperty.PAGE_VALUE);

      context.load(loadedGoalUnit);
      context.load(loadedGoalValue);
      context.load(loadedPageUnit);
      context.load(loadedPageValue);

      await context.sync();

      if (!loadedGoalUnit.isNullObject) {
        setGoalUnit(loadedGoalUnit.value);
      }

      if (!loadedGoalValue.isNullObject) {
        setGoalValue(loadedGoalValue.value);
      }

      if (!loadedPageUnit.isNullObject) {
        setPageUnit(loadedPageUnit.value);
      }

      if (!loadedPageValue.isNullObject) {
        setPageValue(loadedPageValue.value);
      }
    });
  });

  const calculate = async () => {
    return Word.run(async (context) => {
      const body = context.document.body;

      context.load(body, ['text', 'paragraphs']);
      await context.sync();

      const text = body.text;
      const splitText = text.split(/\s+/);
      const letters = splitText.join('').length;
      const words = splitText.length;

      const splitTextWithSpaces = text.split(/\s{2,}/);
      const lettersWithSpaces = splitTextWithSpaces.map((textPart) => textPart.trim()).join('').length;

      const paragraphs = body.paragraphs.items.length;

      const pages = Math.ceil(getValueByUnit(pageUnit, { letters, lettersWithSpaces, words }) / pageValue);

      setLetterCount(letters);
      setLetterWithSpacesCount(lettersWithSpaces);
      setWordCount(words);
      setParagraphCount(paragraphs);
      setPageCount(pages);

      const selectedGoal = getValueByUnit(goalUnit, { letters, lettersWithSpaces, words, pages });

      if (goalValue > 0 && selectedGoal > 0) {
        setProgress(Math.round(selectedGoal / goalValue * 100));
      } else {
        setProgress(null);
      }

      setQuote(getMotivationalQuote());

      setIsCalculatedAtLeastOnce(true);
    });
  };

  const saveCustomProperties = async ({ goalValue, goalUnit, pageValue, pageUnit }) => {
    return Word.run(async (context) => {
      const customProperties = context.document.properties.customProperties;

      if (goalValue) {
        customProperties.add(CustomProperty.GOAL_VALUE, goalValue);
      }

      if (goalUnit) {
        customProperties.add(CustomProperty.GOAL_UNIT, goalUnit);
      }

      if (pageValue) {
        customProperties.add(CustomProperty.PAGE_VALUE, pageValue);
      }

      if (pageUnit) {
        customProperties.add(CustomProperty.PAGE_UNIT, pageUnit);
      }

      await context.sync();
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
          <div className="value-unit-input">
            <span style={{ width: '35%' }}>
              <SpinButton
                  label="Goal"
                  labelPosition={Position.top}
                  placeholder="Goal value"
                  value={`${goalValue}`}
                  min={1}
                  step={1}
                  onIncrement={(value) => {
                    const parsedNumber = parseInt(value, 10);
                    if (parsedNumber) {
                      const newValue = parsedNumber + 1
                      setGoalValue(newValue);
                      saveCustomProperties({ goalValue: newValue });
                    }
                  }}
                  onDecrement={(value) => {
                    const parsedNumber = parseInt(value, 10);
                    if (parsedNumber && parsedNumber > 1) {
                      const newValue = parsedNumber - 1;
                      setGoalValue(newValue);
                      saveCustomProperties({ goalValue: newValue });
                    }
                  }}
                  onValidate={(value) => {
                    const parsedNumber = parseInt(value, 10);
                    if (parsedNumber && parsedNumber > 0) {
                      setGoalValue(parsedNumber);
                      saveCustomProperties({ goalValue: parsedNumber });
                    }
                  }}
              />
            </span>

            <span style={{ width: '60%' }}>
              <Dropdown
                  placeholder="Goal unit"
                  selectedKey={goalUnit}
                  onChange={(_, item) => {
                    setGoalUnit(item.key);
                    saveCustomProperties({ goalUnit: item.key })
                  }}
                  options={[
                    { key: Unit.LETTER, text: 'Letter(s)' },
                    { key: Unit.LETTER_WITH_SPACES, text: 'Letter(s) with spaces' },
                    { key: Unit.WORD, text: 'Word(s)' },
                    { key: Unit.PAGE, text: 'Page(s)', }
                  ]}
              />
            </span>
          </div>

          {goalUnit === Unit.PAGE && (
              <div className="value-unit-input">
                <span style={{ width: '35%' }}>
                  <SpinButton
                      label="Page size"
                      labelPosition={Position.top}
                      placeholder="Page size value"
                      value={`${pageValue}`}
                      min={1}
                      step={1}
                      onIncrement={(value) => {
                        const parsedNumber = parseInt(value, 10);
                        if (parsedNumber) {
                          const newValue = parsedNumber + 1
                          setPageValue(newValue);
                          saveCustomProperties({ pageValue: newValue });
                        }
                      }}
                      onDecrement={(value) => {
                        const parsedNumber = parseInt(value, 10);
                        if (parsedNumber && parsedNumber > 1) {
                          const newValue = parsedNumber - 1;
                          setPageValue(newValue);
                          saveCustomProperties({ pageValue: newValue });
                        }
                      }}
                      onValidate={(value) => {
                        const parsedNumber = parseInt(value, 10);
                        if (parsedNumber && parsedNumber > 0) {
                          setPageValue(parsedNumber);
                          saveCustomProperties({ pageValue: parsedNumber });
                        }
                      }}
                  />
                </span>

                <span style={{ width: '60%' }}>
                  <Dropdown
                      placeholder="Page size unit"
                      selectedKey={pageUnit}
                      onChange={(_, item) => {
                        setPageUnit(item.key);
                        saveCustomProperties({ pageUnit: item.key })
                      }}
                      options={[
                        { key: Unit.LETTER, text: 'Letter(s)' },
                        { key: Unit.LETTER_WITH_SPACES, text: 'Letter(s) with spaces' },
                        { key: Unit.WORD, text: 'Word(s)' },
                      ]}
                  />
                </span>
              </div>
          )}

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
                <Progress progress={progress} />

                <Statistics
                    letterCount={letterCount}
                    letterWithSpacesCount={letterWithSpacesCount}
                    wordCount={wordCount}
                    paragraphCount={paragraphCount}
                    pageCount={pageCount}
                />

                <Quote quote={quote} />
              </>
          ) : (
              <p className="ms-font-l">
                Click <b>Calculate</b> to see the statistics.
              </p>
          )}
        </main>
      </div>
  );
};

export default App;
