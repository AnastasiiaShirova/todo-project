export interface UserInterface {
  userId: number;
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  website: string;
  photoUrl?: string;
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
  }
  company: {
    name: string;
  }
}
