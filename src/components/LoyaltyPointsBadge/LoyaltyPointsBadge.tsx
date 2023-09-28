import React from 'react';
import { iconLoyaltyPoints } from '../../utils/config';

interface LoyaltyPointsBadgeProps {
  points: number;
}

const LoyaltyPointsBadge: React.FC<LoyaltyPointsBadgeProps> = ({ points }) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '24px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>{`+${points}`}</p>
      <img
        src={iconLoyaltyPoints}
        alt="Loyalty Points Icon"
        style={{ width: '24px', marginLeft: '5px' }}
      />
    </div>
  );
};

export default LoyaltyPointsBadge;
