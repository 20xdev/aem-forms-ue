const catalogs = {
  'default-credit-cards': [
    {
      id: 'rewards',
      image: '/icons/card-teal.png',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 10X CashPoints',
      rewardsDescription: '₹150 spent = 1 Reward Point',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
    },
    {
      id: 'low-rate',
      image: '/icons/card-gray.png',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 5% Fuel Points',
      rewardsDescription: '₹150 spent = 1 Fuel Point',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
    },
    {
      id: 'low-fee',
      image: '/icons/card-gold.png',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 4X Reward Points',
      rewardsDescription: '₹150 spent = 2 CashPoints',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
    },
    {
      id: 'the-ultimate',
      image: '/icons/card-black.png',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 7.5% NeuCoins',
      rewardsDescription: '2% back as NeuCoins on Tata Brands',
      joiningFee: 'Joining/Renewal Fees - ₹499/-',
      applicationAmount: '₹ 0/-',
    },
  ],
};

export default function getCatalog(key) {
  return catalogs[key] || [];
}
