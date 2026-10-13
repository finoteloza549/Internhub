import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'http';
import jwt from 'jsonwebtoken';
import app from '../src/app.js';
import { hashPassword, comparePassword } from '../src/utils/password.js';
import { generateToken } from '../src/utils/generateToken.js';
import { ApiError } from '../src/utils/ApiError.js';
import { registerSchema, loginSchema } from '../src/validators/auth.validator.js';
import { authorize } from '../src/middleware/role.middleware.js';

describe('InternHub Production Test Suite', () => {
  let server;
  let baseUrl;

  before(async () => {
    // Start ephemeral test server
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    // Close test server
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  // 1. UTILITY TESTS
  describe('Security & Utility Functions', () => {
    it('should hash a password and correctly verify it with bcrypt', async () => {
      const rawPassword = 'SecurePassword123!';
      const hash = await hashPassword(rawPassword);

      assert.notEqual(hash, rawPassword);
      assert.equal(typeof hash, 'string');

      const isMatch = await comparePassword(rawPassword, hash);
      assert.equal(isMatch, true);

      const isWrongMatch = await comparePassword('WrongPassword', hash);
      assert.equal(isWrongMatch, false);
    });

    it('should generate a valid JWT token with user ID and role', () => {
      const mockId = '660e1d8f1e2a3b4c5d6e7f8a';
      const mockRole = 'STUDENT';
      const token = generateToken(mockId, mockRole);

      assert.equal(typeof token, 'string');

      const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_internhub_key';
      const decoded = jwt.verify(token, secret);

      assert.equal(decoded.id, mockId);
      assert.equal(decoded.role, mockRole);
    });

    it('should create standardized ApiError instances with custom status and payload', () => {
      const err = new ApiError(404, 'Resource not found', ['Detail error']);
      assert.equal(err.statusCode, 404);
      assert.equal(err.message, 'Resource not found');
      assert.equal(err.success, false);
      assert.deepEqual(err.errors, ['Detail error']);
    });
  });

  // 2. SCHEMA & VALIDATION TESTS
  describe('Zod Request Validation Schemas', () => {
    it('should validate a valid registration payload', () => {
      const validPayload = {
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        password: 'Password123!',
        role: 'STUDENT',
      };

      const result = registerSchema.safeParse(validPayload);
      assert.equal(result.success, true);
    });

    it('should reject registration when email format is invalid', () => {
      const invalidPayload = {
        name: 'Alex Johnson',
        email: 'not-an-email',
        password: 'Password123!',
        role: 'STUDENT',
      };

      const result = registerSchema.safeParse(invalidPayload);
      assert.equal(result.success, false);
      const emailError = result.error.issues.find((i) => i.path.includes('email'));
      assert.ok(emailError);
    });

    it('should reject registration when password is shorter than 6 characters', () => {
      const invalidPayload = {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: '123',
        role: 'STUDENT',
      };

      const result = registerSchema.safeParse(invalidPayload);
      assert.equal(result.success, false);
      const pwdError = result.error.issues.find((i) => i.path.includes('password'));
      assert.ok(pwdError);
    });

    it('should reject unknown roles outside STUDENT, EMPLOYER, ADMIN', () => {
      const invalidPayload = {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: 'Password123!',
        role: 'SUPERUSER',
      };

      const result = registerSchema.safeParse(invalidPayload);
      assert.equal(result.success, false);
    });

    it('should validate login credentials schema correctly', () => {
      const validLogin = {
        email: 'user@example.com',
        password: 'SecretPassword',
      };
      assert.equal(loginSchema.safeParse(validLogin).success, true);

      const invalidLogin = {
        email: 'invalid-email',
        password: '',
      };
      assert.equal(loginSchema.safeParse(invalidLogin).success, false);
    });
  });

  // 3. ROLE-BASED ACCESS CONTROL (RBAC) TESTS
  describe('Role-Based Authorization Middleware', () => {
    it('should grant access when user role matches authorized roles', (t, done) => {
      const middleware = authorize('EMPLOYER', 'ADMIN');
      const req = { user: { role: 'EMPLOYER' } };
      const res = {};

      middleware(req, res, (err) => {
        assert.equal(err, undefined);
        done();
      });
    });

    it('should deny access with 403 Forbidden when user role is not authorized', (t, done) => {
      const middleware = authorize('EMPLOYER');
      const req = { user: { role: 'STUDENT' } };
      const res = {};

      middleware(req, res, (err) => {
        assert.ok(err instanceof ApiError);
        assert.equal(err.statusCode, 403);
        assert.ok(err.message.includes('not authorized'));
        done();
      });
    });

    it('should deny access with 401 Unauthorized when user context is missing', (t, done) => {
      const middleware = authorize('ADMIN');
      const req = {};
      const res = {};

      middleware(req, res, (err) => {
        assert.ok(err instanceof ApiError);
        assert.equal(err.statusCode, 401);
        done();
      });
    });
  });

  // 4. HTTP ENDPOINTS & SECURITY INTEGRATION
  describe('HTTP REST API & Security Handlers', () => {
    it('GET /api/health should return 200 and healthy status', async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.message, 'InternHub API is healthy and operational');
      assert.ok(data.timestamp);
    });

    it('GET /api should return 200 and root directory information', async () => {
      const res = await fetch(`${baseUrl}/api`);
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.endpoints);
      assert.equal(data.endpoints.auth, '/api/auth');
    });

    it('GET /non-existent-route should return standardized 404 ApiError', async () => {
      const res = await fetch(`${baseUrl}/api/non-existent-route`);
      assert.equal(res.status, 404);

      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.message.includes('Route not found'));
    });

    it('POST /api/auth/register with empty body should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.message);
    });

    it('POST /api/auth/login with invalid email format should return 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'not-an-email',
          password: 'pass',
        }),
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.message.includes('valid email'));
    });

    it('GET /api/auth/me without Bearer token should return 401 Unauthorized', async () => {
      const res = await fetch(`${baseUrl}/api/auth/me`);
      assert.equal(res.status, 401);

      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.message.includes('token missing'));
    });

    it('GET /api/auth/me with invalid or forged token should return 401 Unauthorized', async () => {
      const res = await fetch(`${baseUrl}/api/auth/me`, {
        headers: {
          Authorization: 'Bearer invalid.fake.token.string',
        },
      });

      assert.equal(res.status, 401);
      const data = await res.json();
      assert.equal(data.success, false);
    });

    it('POST /api/jobs without authorization header should return 401', async () => {
      const res = await fetch(`${baseUrl}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Software Engineer Intern',
        }),
      });

      assert.equal(res.status, 401);
    });
  });
});
