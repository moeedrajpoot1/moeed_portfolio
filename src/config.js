const env = import.meta.env;

function required(key) {
  const value = env[key];
  if (!value) {
    console.warn(`[config] Missing env var ${key} — falling back to empty string.`);
    return '';
  }
  return value;
}

export const config = {
  web3formsKey: required('VITE_WEB3FORMS_KEY'),
  contactEmail: required('VITE_CONTACT_EMAIL'),
  githubUrl: required('VITE_GITHUB_URL'),
  linkedinUrl: required('VITE_LINKEDIN_URL'),
  siteUrl: env.VITE_SITE_URL || '',
};

export const gmailComposeUrl = (to) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
