declare type SignUpParams = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  type: "individual" | "business";
  identity?: {
    type: "nin" | "bvn" | "passport" | "license";
    number: string;
  };
  address?: string;
  password: string;
  id: string;
};

interface signInProps {
  email: string;
  password: string;
}

interface NavbarProps {
  type: string;
  userName?: string;
  userId?: string;
  userImage?: string;
  user?: user;
}

declare type User = {
  $id: string;
  firstName: string;
  dwollaCustomerId: string;
  email: string;
  password: string;
  name: string;
};

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}

declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}

declare interface createBankAccountProps {
  accessToken: string;
  users: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}

declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}
declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};
declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};
declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};
