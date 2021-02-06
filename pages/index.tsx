import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const IndexPage = () => (
  <div> 
    <h1>Welcome!</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      {/* <Image /> */}
    </div>
    
    <p><Link href="/submitItem/">Submit Item for Vote</Link></p>
    <p><Link href="/submitVote/">Vote on Item</Link></p>
    <p><Link href="/welcome/">Welcome</Link></p>
  </div>
);

export default IndexPage;
