/**
 * This CloudFormation template supports both apps hosted at the root domain (e.g., https://covit.com)
 * and apps hosted on a subdomain (what is configured below, https://covit.bjacobel.com).
 * Note that setting the ProjectDomain and ProjectFQDomain to the same value will trigger config for the root domain
 * case, and will add extra resources (an additional A record and SAN for www.ProjectDomain).
 * You still need both values even if they are the same.
 */
module.exports = {
  // The common name for your project. Used for naming CloudFormation stacks and CloudFront distros.
  ProjectName: 'covit',

  // The root domain that your project will live at. Used for creating hosted zones and connecting DNS.
  ProjectDomain: 'bjacobel.com',

  // If project will live on a subdomain, give the fully qualified domain here. Otherwise use the same value as above.
  ProjectFQDomain: 'covit.bjacobel.com',

  // The AWS region you want to create these resources in.
  AWSRegion: 'us-east-1',
};
