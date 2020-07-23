import * as React from 'react';

interface PushPinProps {
  className?: string;
}

export const PushPin = ({ className }: PushPinProps) => (
  <svg width="28" viewBox="0 0 28 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8.54036 6.5L4.04036 1H14.5H24L19.5 6.5L20.5 27C21 27 27 29 27 32.5C27 32.6501 27.0908 32.7311 27 32.8414H15L14 54.5L13 32.8414H1.04036C0.949545 32.7311 1.04036 32.6501 1.04036 32.5C1.04036 29 7.04036 27 7.54036 27L8.54036 6.5Z"
      fill="white"
    />
    <path
      d="M4.04036 1V0.5C3.84717 0.5 3.67126 0.611301 3.58853 0.785885C3.5058 0.960469 3.53105 1.16709 3.65339 1.31662L4.04036 1ZM8.54036 6.5L9.03977 6.52436L9.04914 6.33225L8.92734 6.18338L8.54036 6.5ZM7.54036 27V27.5H8.01657L8.03977 27.0244L7.54036 27ZM1.04036 32.8414L0.654424 33.1593L0.804426 33.3414H1.04036V32.8414ZM24 1L24.387 1.31662C24.5093 1.16709 24.5346 0.960469 24.4518 0.785885C24.3691 0.611301 24.1932 0.5 24 0.5V1ZM19.5 6.5L19.113 6.18338L18.9912 6.33225L19.0006 6.52436L19.5 6.5ZM20.5 27L20.0006 27.0244L20.0238 27.5H20.5V27ZM27 32.8414V33.3414H27.2359L27.3859 33.1593L27 32.8414ZM14 54.5L13.5005 54.5231C13.5129 54.79 13.7328 55 14 55C14.2672 55 14.4871 54.79 14.4995 54.5231L14 54.5ZM3.65339 1.31662L8.15339 6.81662L8.92734 6.18338L4.42734 0.683381L3.65339 1.31662ZM8.04096 6.47564L7.04096 26.9756L8.03977 27.0244L9.03977 6.52436L8.04096 6.47564ZM1.54036 32.5C1.54036 31.7765 1.84877 31.1051 2.3687 30.4855C2.89071 29.8633 3.60605 29.3187 4.36011 28.8662C5.11132 28.4155 5.88086 28.0682 6.49252 27.8342C6.79804 27.7172 7.06022 27.6301 7.25692 27.5729C7.35559 27.5443 7.43407 27.5243 7.49104 27.5119C7.56011 27.4969 7.56724 27.5 7.54036 27.5V26.5C7.45098 26.5 7.35265 26.5187 7.27889 26.5347C7.19304 26.5533 7.09135 26.5797 6.97811 26.6126C6.75098 26.6785 6.46238 26.775 6.13508 26.9002C5.48112 27.1505 4.65691 27.522 3.84562 28.0088C3.03718 28.4938 2.22126 29.1054 1.60265 29.8427C0.981962 30.5824 0.540364 31.4735 0.540364 32.5H1.54036ZM1.4263 32.5235C1.43763 32.5373 1.45238 32.5582 1.46587 32.5866C1.47968 32.6156 1.48971 32.6473 1.4952 32.6801C1.50591 32.7442 1.49532 32.7899 1.49514 32.7907C1.49511 32.7909 1.49568 32.7883 1.49964 32.7733C1.50275 32.7617 1.50887 32.739 1.51453 32.7147C1.52665 32.6627 1.54036 32.589 1.54036 32.5H0.540364C0.540364 32.486 0.542723 32.4788 0.540655 32.4876C0.539218 32.4938 0.537538 32.5001 0.533193 32.5165C0.529707 32.5296 0.523178 32.554 0.517477 32.5805C0.505945 32.6342 0.489675 32.7302 0.508903 32.8451C0.529435 32.9679 0.583342 33.073 0.654424 33.1593L1.4263 32.5235ZM23.613 0.683381L19.113 6.18338L19.887 6.81662L24.387 1.31662L23.613 0.683381ZM19.0006 6.52436L20.0006 27.0244L20.9994 26.9756L19.9994 6.47564L19.0006 6.52436ZM27.5 32.5C27.5 31.4735 27.0584 30.5824 26.4377 29.8427C25.8191 29.1054 25.0032 28.4938 24.1947 28.0088C23.3835 27.522 22.5592 27.1505 21.9053 26.9002C21.578 26.775 21.2894 26.6785 21.0623 26.6126C20.949 26.5797 20.8473 26.5533 20.7615 26.5347C20.6877 26.5187 20.5894 26.5 20.5 26.5V27.5C20.4731 27.5 20.4803 27.4969 20.5493 27.5119C20.6063 27.5243 20.6848 27.5443 20.7834 27.5729C20.9801 27.6301 21.2423 27.7172 21.5478 27.8342C22.1595 28.0682 22.929 28.4155 23.6803 28.8662C24.4343 29.3187 25.1496 29.8633 25.6717 30.4855C26.1916 31.1051 26.5 31.7765 26.5 32.5H27.5ZM27.3859 33.1593C27.457 33.073 27.5109 32.9679 27.5315 32.8451C27.5507 32.7302 27.5344 32.6342 27.5229 32.5805C27.5172 32.554 27.5107 32.5296 27.5072 32.5165C27.5028 32.5001 27.5011 32.4938 27.4997 32.4876C27.4976 32.4788 27.5 32.486 27.5 32.5H26.5C26.5 32.589 26.5137 32.6627 26.5258 32.7147C26.5315 32.739 26.5376 32.7617 26.5407 32.7733C26.5447 32.7883 26.5453 32.7909 26.5452 32.7907C26.545 32.7899 26.5345 32.7442 26.5452 32.6801C26.5507 32.6473 26.5607 32.6156 26.5745 32.5866C26.588 32.5582 26.6027 32.5373 26.6141 32.5235L27.3859 33.1593ZM24 0.5H14.5V1.5H24V0.5ZM4.04036 1.5H14.5V0.5H4.04036V1.5ZM1.04036 33.3414H13V32.3414H1.04036V33.3414ZM13 33.3414H15V32.3414H13V33.3414ZM15 33.3414H27V32.3414H15V33.3414ZM12.5005 32.8645L13.5005 54.5231L14.4995 54.4769L13.4995 32.8183L12.5005 32.8645ZM14.4995 54.5231L15.4995 32.8645L14.5005 32.8183L13.5005 54.4769L14.4995 54.5231Z"
      fill="white"
    />
  </svg>
);
