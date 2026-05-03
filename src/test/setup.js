import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubEnv('VITE_WEB3FORMS_KEY', 'test-access-key');
vi.stubEnv('VITE_CONTACT_EMAIL', 'test@example.com');
vi.stubEnv('VITE_GITHUB_URL', 'https://github.com/test-user');
vi.stubEnv('VITE_LINKEDIN_URL', 'https://www.linkedin.com/in/test-user/');
vi.stubEnv('VITE_SITE_URL', 'https://test.example.com');
