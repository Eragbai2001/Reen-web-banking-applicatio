declare type SignUpParams = {
  firstName: string;
  email: string;
  password: string;
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
  user: User;
}

declare type User = {
  firstName: string;
  email: string;
  password: string;
  name: string;
};
