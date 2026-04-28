
export type registerNewUser = {
  firstName: string;
  lastName: string;
  email: string;
  loginName: string;
  password: string;
  address1:string;
  city:string;
  state:string;
  zipcode:string;
  country:string;
};

export function registerNewUser(overrides: Partial<registerNewUser> = {}): registerNewUser {
  const id = Date.now();
  return {
    firstName: 'Test0505',
    lastName: `User${id}`,
    email: `pw_user_${id}@example.com`,
    loginName: `pw_login_${id}`,
    password: `Pw!${id}Aa`,
    address1: '123 Test Street',
    city: 'TestCity',
    zipcode: '12345',
    country: 'India',      
    state: 'Kerala', 
  };
}
