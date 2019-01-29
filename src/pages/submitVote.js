import React from 'react';
import { Link } from 'gatsby';


import Layout from '../components/layout';
import SEO from '../components/seo';

const SubmitVotePage = () => (
  <Layout>
    <SEO title="Submit Vote on Item" />
    <p>Vote</p>
    <p>Style</p>
    <p>Brand</p>
    <p>Comments</p>
    <Link to="/">Back</Link>
  </Layout>
);

export default SubmitVotePage;
