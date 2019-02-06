import React from 'react';
import { Link } from 'gatsby';
import { Button, TextField } from '@material-ui/core';

import Layout from '../components/layout';
import SEO from '../components/seo';

const SubmitVotePage = () => (
  <Layout>
    <SEO title="Submit Vote on Item" />
    <form>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Vote" placeholder="(1-10)" type="range" max="10" min="0" required={ true } fullWidth={ true } name="ItemName"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Name" placeholder="(i.e. Cherry Blossom, Indian Well Red, etc.)" fullWidth={ true } name="ItemName"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Style" placeholder="(i.e. Merlot, Pinot Noir, etc.)" fullWidth={ true } name="ItemStyle"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Brand" placeholder="(i.e. Trader Gioto's, Chateau Ste. Michelle, etc)" fullWidth={ true } name="Item Brand"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField variant="outlined" label="Comments" placeholder="(i.e. Cost, Tasting Notes, etc.)" fullWidth={ true }></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <Button type="submit" fullWidth={ true }>Submit Vote on Item</Button>
      </div>
    </form>
    <Link to="/">Back</Link>
  </Layout>
);

export default SubmitVotePage;
