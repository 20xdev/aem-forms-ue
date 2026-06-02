const catalogs = {
  'default-credit-cards': [
    {
      id: 'rewards',
      name: 'Rewards',
      image: '/icons/cards/card-teal.png',
      imageAlt: 'Rewards credit card',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 10X CashPoints',
      rewardsDescription: '₹150 spent = 1 Reward Point',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
    },
    {
      id: 'low-rate',
      name: 'Low Rate',
      image: '/icons/cards/card-gray.png',
      imageAlt: 'Low Rate credit card',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 5% Fuel Points',
      rewardsDescription: '₹150 spent = 1 Fuel Point',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
    },
    {
      id: 'low-fee',
      name: 'Low Fee',
      image: '/icons/cards/card-gold.png',
      imageAlt: 'Low Fee credit card',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 4X Reward Points',
      rewardsDescription: '₹150 spent = 2 CashPoints',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
    },
    {
      id: 'the-ultimate',
      name: 'The Ultimate',
      image: '/icons/cards/card-black.png',
      imageAlt: 'The Ultimate credit card',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 7.5% NeuCoins',
      rewardsDescription: '2% back as NeuCoins on Tata Brands',
      joiningFee: 'Joining/Renewal Fees - ₹499/-',
      applicationAmount: '₹ 0/-',
    },
  ],
};

export default function getCatalog(key = 'default-credit-cards') {
  return catalogs[key] || [];
}
