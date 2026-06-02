const catalogs = {
  'default-credit-cards': [
    {
      id: 'rewards',
      name: 'Rewards',
      image: '/media/cards/card-teal.png',
      imageAlt: 'Rewards credit card',
      badge: 'Best for rewards',
      tagline: 'Best Card for Rewards & Offers',
      rewardsRate: 'Upto 10X CashPoints',
      rewardsDescription: '₹150 spent = 1 Reward Point',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
      benefits: [
        'Welcome rewards on activation',
        'Accelerated reward points on shopping',
        'Exclusive partner offers and discounts',
      ],
    },
    {
      id: 'low-rate',
      name: 'Low Rate',
      image: '/media/cards/card-gray.png',
      imageAlt: 'Low Rate credit card',
      badge: 'Low interest',
      tagline: 'Smart Choice for Lower Interest',
      rewardsRate: 'Upto 5% Fuel Points',
      rewardsDescription: '₹150 spent = 1 Fuel Point',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
      benefits: [
        'Lower interest on carried balance',
        'Fuel benefits on eligible spends',
        'Easy EMI conversion on purchases',
      ],
    },
    {
      id: 'low-fee',
      name: 'Low Fee',
      image: '/media/cards/card-gold.png',
      imageAlt: 'Low Fee credit card',
      badge: 'Low annual fee',
      tagline: 'Value Card with Low Annual Fee',
      rewardsRate: 'Upto 4X Reward Points',
      rewardsDescription: '₹150 spent = 2 CashPoints',
      joiningFee: 'Joining/Renewal Fees - ₹500/-',
      applicationAmount: '₹ 0/-',
      benefits: [
        'Affordable annual fee',
        'Reward points on daily spends',
        'Dining and lifestyle privileges',
      ],
    },
    {
      id: 'the-ultimate',
      name: 'The Ultimate',
      image: '/media/cards/card-black.png',
      imageAlt: 'The Ultimate credit card',
      badge: 'Premium',
      tagline: 'Premium Card with Elevated Benefits',
      rewardsRate: 'Upto 7.5% NeuCoins',
      rewardsDescription: '2% back as NeuCoins on Tata Brands',
      joiningFee: 'Joining/Renewal Fees - ₹499/-',
      applicationAmount: '₹ 0/-',
      benefits: [
        'Premium rewards across partner brands',
        'Airport lounge and travel privileges',
        'Enhanced lifestyle and concierge benefits',
      ],
    },
  ],
};

export default function getCatalog(key = 'default-credit-cards') {
  return catalogs[key] || [];
}
