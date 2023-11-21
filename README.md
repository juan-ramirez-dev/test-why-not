# Why Not Prueba de Selección

MongoDB - Next.js

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


# Modelos de MongoDB

La aplicación utiliza tres modelos de MongoDB para gestionar datos relacionados con roles, torneos y usuarios. Aquí está la documentación detallada para cada modelo:

## Roles

### Descripción
El modelo "Roles" se utiliza para representar los roles que pueden tener los usuarios en la aplicación. Cada rol tiene ciertos permisos asociados.

### Atributos
- `name` (String, obligatorio): Nombre del rol.
- `slug` (String, obligatorio, único): Identificador único del rol.
- `can_managment_tournaments` (Boolean, por defecto `false`): Permiso para gestionar torneos.
- `can_managment_users` (Boolean, por defecto `false`): Permiso para gestionar usuarios.
- `can_participate_tournaments` (Boolean, por defecto `false`): Permiso para participar en torneos.

### Relaciones
Ninguna.

## Tournaments

### Descripción
El modelo "Tournaments" representa los torneos en la aplicación. Cada torneo puede tener participantes y es creado por un usuario.

### Atributos
- `name` (String, obligatorio, máximo 100 caracteres): Nombre del torneo.
- `description` (String, obligatorio, máximo 100 caracteres): Descripción del torneo.
- `participants` (Array de ObjectIds referenciando a Users): Participantes en el torneo.
- `createdBy` (ObjectId referenciando a Users): Usuario que creó el torneo.

### Relaciones
- `participants`: Relacionado con el modelo "Users" a través de ObjectIds.
- `createdBy`: Relacionado con el modelo "Users" a través de ObjectId.

## Users

### Descripción
El modelo "Users" representa a los usuarios de la aplicación. Cada usuario tiene un rol asociado y puede ser creado mediante una cuenta local o mediante Google.

### Atributos
- `name` (String, obligatorio, máximo 100 caracteres): Nombre del usuario.
- `email` (String, obligatorio, máximo 100 caracteres): Correo electrónico del usuario.
- `password` (String, obligatorio): Contraseña del usuario (encriptada).
- `role_id` (ObjectId referenciando a Roles): Rol del usuario.
- `is_google` (Boolean): Indica si el usuario se registró mediante Google.

### Relaciones
- `role_id`: Relacionado con el modelo "Roles" a través de ObjectId.

Estos modelos forman la base de datos de la aplicación, permitiendo la gestión de roles, torneos y usuarios de manera eficiente. Asegúrate de mantener la integridad referencial al manipular los datos en la base de datos MongoDB.


## Notas Adicionales

- Asegúrate de completar la información faltante en el archivo `.env` antes de ejecutar la aplicación.
- Asegúrate de tener una instancia de MongoDB en ejecución para que la aplicación se conecte correctamente a la base de datos.
