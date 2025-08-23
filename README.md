# Resolución de Problemas - ToDo List

## Descripción General
Este proyecto es una aplicación de lista de tareas (ToDo List) diseñada para ayudar a los usuarios a gestionar sus tareas de manera eficiente. La aplicación permite a los usuarios:

- Crear nuevas tareas.
- Editar tareas existentes.
- Marcar tareas como completadas o incompletas.
- Eliminar tareas.
- Filtrar tareas por estado (completadas o incompletas).

La aplicación está construida utilizando una arquitectura de frontend y backend separados.

### Tecnologías Utilizadas
- **Frontend**: React con Vite como servidor de desarrollo.
- **Backend**: Node.js con Express y Prisma como ORM.
- **Base de Datos**: PostgreSQL.
- **Contenedores**: Docker y Docker Compose.

## Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes componentes:

- [Docker](https://www.docker.com/)

## Instrucciones para Ejecutar el Proyecto

### 1. Clonar el Repositorio
```bash
git clone https://github.com/eliasalvarado/ResolucionProblemas-ToDoList.git
cd ResolucionProblemas-ToDoList
```

### 2. Configurar Variables de Entorno
Crea un archivo `.env`, basado en el `backend/.env.example` de este repositorio, dentro de la carpeta `backend` y define las siguientes variables:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/tododb?schema=public
PORT=400
```

Crea un archivo `.env`, basado en el `frontend/.env.example` de este repositorio, dentro de la carpeta `frontend` y define las siguientes variables:

```env
VITE_SERVERHOST=http://localhost:4000
```

> [!IMPORTANT]
> Recuerda agregar la palabra 'VITE_' al inicio de la variable

### 3. Construir y Ejecutar los Contenedores
Utiliza Docker Compose para construir y ejecutar los contenedores del frontend y backend:

```bash
docker-compose up --build
```

Esto iniciará los servicios en los siguientes puertos:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend**: [http://localhost:4000](http://localhost:4000)

### 4. Acceder a la Aplicación
Abre tu navegador y accede a [http://localhost:5173](http://localhost:5173) para interactuar con la aplicación.

## Estructura del Proyecto

```
ResolucionProblemas-ToDoList/
├── backend/
│   ├── generated/
│   ├── src/
│   │   └── index.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── Dockerfile
│   ├── .env
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Funcionalidades Clave
- **Frontend**: Interfaz de usuario interactiva con React.
- **Backend**: API REST para gestionar tareas.
- **Base de Datos**: Persistencia de datos con PostgreSQL.
- **Docker**: Contenedores para facilitar el despliegue.

## Contribución
Si deseas contribuir al proyecto, por favor sigue los pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios.
3. Realiza un pull request describiendo tus modificaciones.

### Developer's

<a href="https://github.com/eliasalvarado">
  <img width='75' src="https://avatars.githubusercontent.com/u/77988653?v=4" alt="Elias Alvarado" />
</a>

* [![Linkedin][Linkedin]][Linkedin-elias]
* [![GitHub][GitHub]][GitHub-elias]

<p align="right">(<a href="#readme-top">Ir al inicio</a>)</p>

## 📞 Contacto
Si tienes preguntas o comentarios, puedes contactarnos a traves de nuestras redes sociales:

* [![Linkedin][Linkedin]][Linkedin-elias]

<p align="right">(<a href="#readme-top">Ir al inicio</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[Linkedin-elias]: https://www.linkedin.com/in/ealvaradorax/
[Linkedin]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[Github-elias]: https://github.com/eliasalvarado
[GitHub]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white