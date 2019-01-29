import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const SubmitItemPage = () => (
  <Layout>
    <SEO title="Submit Item For Vote" />
    <p>Name</p>
    <p>Style</p>
    <p>Brand</p>
    <p>Cost</p>
    <p>Score(Global)</p>
    <Link to="/">Back</Link>
  </Layout>
);

export default SubmitItemPage;
