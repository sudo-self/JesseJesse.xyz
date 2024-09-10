import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';

const Body = ({ title, children }) => {
    return (
        <main>
            <Head>
                <title className="notranslate">{title + ' - JesseJesse.xyz'}</title>
            </Head>
            {children}
        </main>
    );
};

Body.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Body;

