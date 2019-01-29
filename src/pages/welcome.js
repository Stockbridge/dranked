import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const WelcomePage = () => (
  <Layout>
    <SEO title="Welcome to Dranked" />
    <p>Hi There!</p>
    <p>Event Identifier:</p>
    <p>Name:</p>
    <Link to="/">Back</Link>
  </Layout>
);

export default WelcomePage;
