import * as React from "react";

const Header = ({ title, logo }) => (
    <section className="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
        <img width="90" height="90" src={logo} alt={title} title={title} />
        <h1 className="ms-fontSize-xxl ms-fontWeight-light ms-fontColor-neutralPrimary">
            Document statistics
        </h1>
    </section>
);

export default Header;
