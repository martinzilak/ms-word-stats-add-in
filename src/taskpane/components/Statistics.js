import React from "react";

const Statistics = ({ letterCount, letterWithSpacesCount, wordCount, paragraphCount, pageCount, isPageSizeConfigured }) => (
    <div className="statistics-wrapper">
        <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">
            <li className="ms-ListItem">
                <i className="ms-Icon ms-Icon--FontColorA" />
                <span className="ms-font-m ms-fontColor-neutralPrimary">
                    {`Letter(s): ${letterCount}`}
                </span>
            </li>

            <li className="ms-ListItem">
                <i className="ms-Icon ms-Icon--FontColor" />
                <span className="ms-font-m ms-fontColor-neutralPrimary">
                    {`Letter(s) with spaces: ${letterWithSpacesCount}`}
                </span>
            </li>

            <li className="ms-ListItem">
                <i className="ms-Icon ms-Icon--TextField" />
                <span className="ms-font-m ms-fontColor-neutralPrimary">
                    {`Word(s): ${wordCount}`}
                </span>
            </li>

            <li className="ms-ListItem">
                <i className="ms-Icon ms-Icon--AlignLeft" />
                <span className="ms-font-m ms-fontColor-neutralPrimary">
                    {`Paragraph(s): ${paragraphCount}`}
                </span>
            </li>

            <li className="ms-ListItem">
                {isPageSizeConfigured ? (
                    <>
                        <i className="ms-Icon ms-Icon--Copy" />
                        <span className="ms-font-m ms-fontColor-neutralPrimary">
                            {`Page(s): ${pageCount}`}
                        </span>
                    </>
                ) : (
                    <span className="ms-font-m ms-fontColor-neutralPrimary">
                        To see statistics about pages, set the page size first
                    </span>
                )}
            </li>
        </ul>
    </div>
);

export default Statistics;
