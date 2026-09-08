export const MOCK_USER = {
  id: 'usr-1fi-9842',
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@example.com',
  kycStatus: 'Verified',
  cibilScore: 785,
  portfolioValue: 580000,
  approvedCreditLimit: 350000,
  availableCreditLimit: 245000,
  activeLoansCount: 1,
  mutualFundHoldings: [
    {
      fundName: 'Parag Parikh Flexi Cap Fund - Direct (G)',
      folioNumber: '10928374/82',
      category: 'Flexi Cap',
      investedAmount: 240000,
      currentValue: 312000,
      cagr: 18.4,
      eligiblePledgeValue: 249600,
      pledgedUnits: 0
    },
    {
      fundName: 'Nippon India Small Cap Fund - Direct (G)',
      folioNumber: '88273619/01',
      category: 'Small Cap',
      investedAmount: 110000,
      currentValue: 168000,
      cagr: 24.2,
      eligiblePledgeValue: 100800,
      pledgedUnits: 0
    },
    {
      fundName: 'HDFC Top 100 Fund - Direct (G)',
      folioNumber: '44556677/99',
      category: 'Large Cap',
      investedAmount: 85000,
      currentValue: 100000,
      cagr: 12.8,
      eligiblePledgeValue: 80000,
      pledgedUnits: 0
    }
  ],
  savedAddresses: [
    {
      id: 'addr-1',
      type: 'Home',
      isDefault: true,
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Tower B, Godrej Summit',
      addressLine2: 'Sector 104, Dwarka Expressway',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122006'
    },
    {
      id: 'addr-2',
      type: 'Office',
      isDefault: false,
      name: 'Rahul Sharma (Fintech Hub)',
      phone: '+91 98765 43210',
      addressLine1: 'DLF Cyber City, Building 10, 8th Floor',
      addressLine2: 'DLF Phase 2',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002'
    }
  ]
};
