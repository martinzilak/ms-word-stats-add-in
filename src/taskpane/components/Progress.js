import React from "react";
import ProgressBar from './ProgressBar';

const Progress = ({ progress }) => (
    <>
        {progress != null && (
            <>
                <span className="ms-font-l ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">
                    Your progress:
                </span>

                <ProgressBar progress={progress} />

                {`${progress}%`}

                <br />

                {progress >= 100 && (
                    <span className="ms-font-xl-plus ms-fontWeight-bold ms-fontColor-neutralPrimary ms-u-slideUpIn20">
                        Congratulations!
                    </span>
                )}

                <hr style={{ width: '100%' }} />
            </>
        )}
    </>
);

export default Progress;
