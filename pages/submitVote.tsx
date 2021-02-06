import React from 'react';
import Link from 'next/link';
import { Button, Slider, TextField } from '@material-ui/core';

const SubmitVotePage = () => (
  <div>
    <form>
      <div style={{marginBottom: "10px"}}>
        <Slider placeholder="(1-10)" max={ 10 } min={ 0 } name="ItemName" />
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField label="Name" placeholder="(i.e. Cherry Blossom, Indian Well Red, etc.)" fullWidth={ true } name="ItemName"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField label="Style" placeholder="(i.e. Merlot, Pinot Noir, etc.)" fullWidth={ true } name="ItemStyle"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField label="Brand" placeholder="(i.e. Trader Gioto's, Chateau Ste. Michelle, etc)" fullWidth={ true } name="Item Brand"></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <TextField label="Comments" placeholder="(i.e. Cost, Tasting Notes, etc.)" fullWidth={ true }></TextField>
      </div>
      <div style={{marginBottom: "10px"}}>
        <Button type="submit" fullWidth={ true }>Submit Vote on Item</Button>
      </div>
    </form>
    <Link href="/">Home</Link>
  </div>
);

export default SubmitVotePage;
