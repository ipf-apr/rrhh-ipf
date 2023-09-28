# Grupo IPF APR

## Integrantes

- Gabriel Acosta
- Ricardo Pedemonte
- Alejandro Ruiz Diaz

El proyecto integrador se trataría de un "Sistema de Gestión y Administración de Recursos Humanos", específicamente para gestionar datos primarios eficientemente en los procesos de selección, conocer el trabajo y desarrollo de cada persona dentro de la empresa, categorizar a los empleados, de modo que sean considerados para puestos de manera justa y obvjetiva, conocer las habilidades y logros de un empleado para ser tenidos en cuenta para ascensos o promociones



>## Acciones necesarias:

- #### Dentro del directorio del proyecto ejecutar:
```bash
npm install
```

- #### Requiere de una base de datos MySQL.

- #### Variables de entorno:
```bash
APP_NAME=
APP_PORT=
APP_URL=



DB_HOST=
DB_USER=
DB_PASS= 
DB_DATABASE=
DB_DIALECT=

JWT_SECRET= 
JWT_TIEMPO_EXPIRA=
JWT_COOKIE_EXPIRES=
```

- #### Configurar en el package.json
```bash
 "scripts": {
    "dev" : "nodemon app.js",
    "start" : "node app.js"
  }
```

- #### Para ejecutar el proyecto en modo desarrollo:
```bash
npm run dev
```


- #### Para ejecutar el proyecto en modo producción:
```bash
npm run start
```