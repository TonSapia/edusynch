import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function Footer() { 
  return (
    <footer className='footer'>
      <div className="copyright">
        <p>Copyright © 2023 - All rights reserved</p>
      </div>
      <Link href='/' className='logo'>
        <Image src='/assets/images/Logo.svg' alt='logo' height={27} width={202}></Image>        
      </Link>  
    </footer>
  );
}