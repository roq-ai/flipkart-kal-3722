interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Trader'],
  customerRoles: [],
  tenantRoles: ['Administrator', 'Financial Analyst', 'Trader'],
  tenantName: 'Organization',
  applicationName: 'flipkart kal',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
