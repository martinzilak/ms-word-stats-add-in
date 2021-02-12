import React from "react";

const Quote = ({ quote }) => (
    <>
        {quote != null && (
            <div className="quote-container">
                <hr style={{ width: '100%' }} />

                <span className="ms-font-l ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20 quote">
                    {quote.QUOTE}
                </span>

                {quote.AUTHOR && (
                    <span className="ms-font-s ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20 quote-author">
                        {`- ${quote.AUTHOR}`}
                    </span>
                )}
            </div>
        )}
    </>
);

export default Quote;
