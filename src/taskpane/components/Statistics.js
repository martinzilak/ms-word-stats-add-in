import React from "react";

const Statistics = ({ letterCount, wordCount, paragraphCount, pageCount }) => (
    <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">
        <li className="ms-ListItem">
            <i className="ms-Icon ms-Icon--FontColorA" />
            <span className="ms-font-m ms-fontColor-neutralPrimary">
                {`Letter count: ${letterCount}`}
            </span>
        </li>

        <li className="ms-ListItem">
            <i className="ms-Icon ms-Icon--TextOverflow" />
            <span className="ms-font-m ms-fontColor-neutralPrimary">
                {`Word count: ${wordCount}`}
            </span>
        </li>

        <li className="ms-ListItem">
            <i className="ms-Icon ms-Icon--PageList" />
            <span className="ms-font-m ms-fontColor-neutralPrimary">
                {`Paragraph count: ${paragraphCount}`}
            </span>
        </li>

        <li className="ms-ListItem">
            <i className="ms-Icon ms-Icon--Copy" />
            <span className="ms-font-m ms-fontColor-neutralPrimary">
                {`Page count: ${pageCount}`}
            </span>
        </li>
    </ul>
);

export default Statistics;
