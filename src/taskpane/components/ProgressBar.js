import React from "react";

const ProgressBar = ({ progress }) => (
    <div className="progress-bar-wrapper ms-borderColor-neutralTertiary">
        <div
            style={{ width: `${Math.min(100, progress)}%` }}
            className="progress-bar"
        />
    </div>
);

export default ProgressBar;
