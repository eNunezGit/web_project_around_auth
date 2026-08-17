# Alrededor de los EE.UU. — Registro y autorización

Aplicación web de galería de fotos con registro, inicio de sesión y rutas
protegidas. Los usuarios pueden crear una cuenta, iniciar sesión y —una vez
autenticados— editar su perfil, cambiar su avatar, añadir tarjetas, darles
"me gusta" y eliminarlas.

Repositorio: https://github.com/eNunezGit/web_project_around_auth

## Funcionalidades

- **Registro y autorización** contra la API de TripleTen, con JWT.
- **Sesión persistente**: el token se guarda en `localStorage` y se valida
  contra `/users/me` al cargar la página, así que no hace falta volver a
  iniciar sesión en cada visita.
- **Rutas protegidas**: `/` requiere sesión activa; `/signin` y `/signup` solo
  son accesibles sin sesión. Cualquier otra ruta redirige según el estado.
- **Cierre de sesión** que limpia el token y el estado de la aplicación.
- **Ventana informativa** (`InfoTooltip`) que confirma si el registro o el
  inicio de sesión tuvieron éxito.
- **Perfil**: editar nombre y descripción, y actualizar el avatar.
- **Tarjetas**: añadir, eliminar, dar "me gusta" y ver la imagen en grande.
- **Validación de formularios** en tiempo real con la Constraint Validation
  API nativa del navegador.
- Los popups se cierran con el botón, haciendo clic fuera o con `Escape`.

## Tecnologías

- React 19
- React Router 7
- Vite
- CSS puro siguiendo la metodología BEM, con diseño responsivo

## Estructura del proyecto

```
src/
├── blocks/          Estilos CSS, un archivo por bloque BEM
├── components/
│   ├── Auth/        Login y Register
│   ├── Form/        Form y FormField reutilizables
│   ├── Main/        Perfil, tarjetas y sus popups
│   └── Popup/       Popup, ImagePopup e InfoTooltip
├── contexts/        Contextos de React
├── hooks/           Hooks personalizados
├── images/          Recursos SVG
├── utils/           api.js (funcionalidad principal) y auth.js (autenticación)
└── vendor/          Normalize y fuentes
```

## API

| Recurso | URL base |
| --- | --- |
| Registro, autorización y funcionalidad principal | `https://se-register-api.en.tripleten-services.com/v1` |

Endpoints de autenticación: `POST /signup`, `POST /signin` y `GET /users/me`
para comprobar la validez del token. El resto de las peticiones viajan con la
cabecera `Authorization: Bearer {token}`.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`.

Otros comandos:

```bash
npm run build     # genera la versión de producción
npm run preview   # sirve la versión de producción localmente
npm run lint      # revisa el código con ESLint
```
