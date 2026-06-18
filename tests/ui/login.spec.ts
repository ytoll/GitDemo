import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://playground.calidadsinhumo.com/login';
const VALID_EMAIL = 'ana.garcia@ejemplo.com';
const VALID_PASSWORD = 'Segura2026!';

test.describe('HU-LOGIN-01 - Inicio de sesión', () => {
  test('CP1 - Login con credenciales válidas muestra mensaje de éxito', async ({ page }) => {
    await page.goto(LOGIN_URL);

    await page.getByLabel('Email').fill(VALID_EMAIL);
    await page.getByLabel('Contraseña').fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    await expect(page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
  });

  test('CP2 - Login con contraseña incorrecta muestra mensaje de error y no concede acceso', async ({ page }) => {
    await page.goto(LOGIN_URL);

    await page.getByLabel('Email').fill(VALID_EMAIL);
    await page.getByLabel('Contraseña').fill('ContraseñaIncorrecta1!');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    await expect(page.getByText('Email o contraseña incorrectos')).toBeVisible();
    await expect(page.getByText('Has iniciado sesión correctamente.')).not.toBeVisible();
  });
});
