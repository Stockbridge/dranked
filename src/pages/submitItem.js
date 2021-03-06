import React from 'react';
import { Link } from 'gatsby';
import { TextField, Button } from '@material-ui/core';

import Layout from '../components/layout';
import SEO from '../components/seo';

const SubmitItemPage = () => (
  <Layout>
    <SEO title="Submit Item For Vote" />
    <form>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Name" placeholder="(i.e. Cherry Blossom, Indian Well Red, etc.)" required={ true } fullWidth={ true } name="ItemName"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Style" placeholder="(i.e. Merlot, Pinot Noir, etc.)" required={ true } fullWidth={ true } name="ItemStyle"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Brand" placeholder="(i.e. Trader Gioto's, Chateau Ste. Michelle, etc)" required={ true } fullWidth={ true } name="Item Brand"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Cost" placeholder="(i.e. $20, $10, etc.)" fullWidth={ true }></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <Button type="submit" fullWidth={ true }>Submit Item for Voting</Button>
      </div>
    </form>
    <Link to="/">Back</Link>
  </Layout>
);

export default SubmitItemPage;
