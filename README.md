# Nombre de la Aplicación

Descripción breve de la aplicación.

## Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior) y [npm](https://www.npmjs.com/) en tu máquina.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes claves privadas:

```env
MONGODB_URI=
SECRET_KEY_TO_GENERATE_TOKEN=
GOOGLE_CLIENT_ID=
```

## Ejecución

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura de Carpetas

- `__test__`: Contiene los archivos de prueba unitaria utilizando Jest.
- `.next`: Directorio de salida de Next.js.
- `.swc`: Archivos compilados.
- `app`: Directorio principal de la aplicación.
  - `api`: Controladores de API.
  - `components`: Componentes reutilizables.
  - `dashboard`: Página principal del panel de control.
  - `login`: Página de inicio de sesión.
  - `register`: Página de registro.
  - `models`: Modelos de MongoDB.
  - `redux`: Configuración de Redux, custom hooks, store, etc.
  - `seeds`: Seeder para generar información inicial.
  - `utils`: Utilidades y funciones auxiliares.
- `node_modules`: Dependencias de npm.
- `public`: Archivos estáticos accesibles públicamente.

## Ejecutar Pruebas Unitarias

```bash
npm run test
```

Esto ejecutará las pruebas unitarias utilizando Jest.

## Notas Adicionales

- Asegúrate de completar la información faltante en el archivo `.env` antes de ejecutar la aplicación.
- Personaliza las páginas, componentes y modelos según tus necesidades específicas.
- Asegúrate de tener una instancia de MongoDB en ejecución para que la aplicación se conecte correctamente a la base de datos.

¡Disfruta desarrollando con Next.js y MongoDB!