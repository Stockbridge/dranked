import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`dranked`]} />
    <h1>Welcome!</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    
    <p><Link to="/submitItem/">Submit Item for Vote</Link></p>
    <p><Link to="/submitVote/">Vote on Item</Link></p>
    <p><Link to="/welcome/">Welcome</Link></p>
  </Layout>
);

export default IndexPage;
