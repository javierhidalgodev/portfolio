---
layout: ../../layouts/MarkdownLayout.astro
title: 'DESPLIEGA tu APLICACIÓN FULL STACK rápido con VERCEL'
pubDate: 2024-03-28
description: ''
author: 'Javier Hidalgo'
image:
    url: 'https://randomuser.me/api/portraits/men/51.jpg'
    alt: 'El logotipo completo de Astro.'
tags: ["Desarrollo Web", "Vercel", "Full Stack"]
---

# Desplegar una aplicación Full Stack en Vercel

Las posibilidades de desplegar nuestras aplicaciones web en producción son muchas, y dependen a su vez de muchos factores. Es más fácil que nunca hacerlo, pero puede pasarte (como ha sido mi caso recientemente), que "no des con la tecla" para obtener los resultados que buscas.

Mi intención es este "mini-tutorial" es ayudarte a poder desplegar tu aplicación Full Stack en [Vercel](https://vercel.com/), y estaré muy satisfecho si además aprendes algo de utilidad y te ahorro tiempo. **¡Vamos a ello!**

### Estructura base de la aplicación

Antes de empezar déjame señalarte dos cosas importantes acerca de cuál es la estructura, ya que es importante para poder desplegarla con éxito:

1. Mi aplicación se divide en dos carpetas, una para el servidor (*back*) y otra para el cliente (*front*).
2. En este directorio raíz es donde se ubicará el repositorio de Git.

```
/mi-proyecto(raíz del repositorio Git)
├── / servidor (back)
│   ├── /...
│   ├── /...
│   ├── .env (Variables de entorno)
│   ├── index.js (Donde se escucha la aplicación)
│   └── package.json
│   └── vercel.json (Configuración para Vercel)
└── /front
    ├── /...
    ├── /...
    ├── /...
    ├── package.json (Donde se ubica el comando para hacer la build del proyecto)
    └── framework.config.js
```

Sabiendo esto vamos a empezar con la parte del servidor (*back*)

### Back End

##### Estructura
En mi caso el *Back* End está construido sobre [Express.](https://expressjs.com/) Se trata de una pequeña API, con sus respectivas rutas configuradas, y que se relaciona a su vez con una base de datos de [MongoDB](https://www.mongodb.com/es/atlas).

Los archivos fundamentales para el despliegue son tres:

1. El archivo principal de la aplicación, que en mi caso es `index.js`, y que es el punto de entrada desde donde se "escucha" la aplicación.
2. El archivo de variables de entorno, que en mi caso es `.env`, y que para el funcionamiento de mi aplicación tiene la clave para conectarse con la base de datos de MongoDB y el puerto de escucha de la aplicación.
3. Y en tercer lugar el archivo de configuración de Vercel, que se llamará `vercel.json`, y que será imprescindible para que Vercel pueda desplegar correctamente nuestra aplicación.

Los dos primeros archivos no necesitan ninguna configuración especial. Obviamente deben estar bien formados para que la aplicación funcione correctamente, pero este no es el tema que ocupa este tutorial.

Vamos a centrarnos en el archivo de configuración `vercel.json` que debe tener la siguiente estructura:

```json
{
  "builds": [
    {
      "src": "./index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

1. El array de *builds* va a contener a su vez un objeto con dos atributos:
    - `src` hace referencia al archivo donde la aplicación empieza a ser "escuchada":
    - `use` hace referencia al *builder* que debe ejecutar la aplicación, en mi caso debe de ser el de Node.js.
2. El array de *routes* configura precisamente las rutas de la aplicación en relación a las solicitudes, los archivos o funciones que debe manejar:
    - `src` hace referencia a la ruta específica, que en este caso es cualquier ruta.
    - `dest` es el destino de la ruta arriba indicada, que en este caso es la raíz.

##### Despliegue

Para el despliegue debemos contar con una cuenta de Vercel, que además debe estar ligada a la cuenta de [GitHub](https://github.com/) donde subamos el repositorio.

Voy a dejarte en [este enlace](https://www.youtube.com/watch?v=YYmzj5DK_5s&t=648s) un vídeo a YouTube en el que me he inspirado para este tutorial, y allí podrás ver los pasos que voy a seguir ahora. 

Desde la pestaña *"Overview"* pulsaremos el botón *"Add New..."*, y seguidamente "*Project*". Si no tienes ligada la cuenta de GitHub, es este punto donde deberás hacerlo.

Importas el repositorio específico de tu aplicación, y desde aquí empieza la configuración de tu despliegue de la parte *Back*:
- Le das un nombre a tu aplicación. En mi caso será el nombre de aplicación de `-api`.
- No configures ningún *framework*, déjalo en *"Other"*. 
- La carpeta raíz debe ser donde esté el archivo raíz `index.js`. En mi caso es en la carpeta `back`, asi que esa será la carpeta raíz.
- Configuramos las variables de entorno necesarias para que la aplicación funcione, que en mi caso son el "PORT" de la aplicación y la "MONGODB_URI".
- Desplegamos la aplicación y comprobamos, atacando la ruta principal de la *API* que esta funciona.

### Front End

##### Estructura
En este caso dependerá de qué *framework* uses, pero tranquilo, porque Vercel tiene muchas configuraciones previas una vez vayas a desplegar la aplicación.

Lo importante en este caso son dos aspectos:
1. Que el *script* que hace la `build` de tu proyecto esté bien configurado en el `package.json`.
2. Que la ruta de la *API* esté bien declarada y usada en los archivos donde se vayan a hacer peticiones al servidor. Esta *URL* será la que Vercel genera cuando despliega el servidor, y que se parece a `https://nombre-de-la-aplicacion.vercel.app/`, donde `nombre-de-la-aplicacion` es el nombre que le diste a tu parte del servidor.

Yo he construido mi proyecto con [Vite](https://vitejs.dev/), por lo tanto mi *script* será `"build": "vite build"`.

Además me cercioro de que todos los archivos que hagan peticiones al servidor usen la *URI* correcta.

##### Despliegue
Seguimos los mismos pasos que con el *Back*, pero directorio principal que debemos seleccionar en la importación del proyecto ya no es el del servidor, sino el del cliente (*front*):
  - Le damos un nombre a la aplicación, en este caso sin ningún añadido, solo aquel que vaya a aparece en la *URL* (aunque más adelante se puede modificar).
  - En este caso buscamos el *framework* que hayamos usado (Vite para mí). Dudo que no encuentres una integración, pero si tu *framework* no aparece, déjalo en "*Other*" y en el campo donde se configura el comando para realizar la `build`, escribe el comando que usa tu *framework*.
  - La carpeta de "*Output*" será en este caso el directorio donde tu *framework* ubica todos los archivos para que tu aplicación pueda ser interpretada por el navegador. En el caso de mi versión de Vite el directorio que crea se llama `dist`.

Desplegamos la aplicación y navegamos a la *URL* que nos ofrece Vercel y... ¡Ya has terminado de desplegar tu aplicación Full Stack en Vercel!

Comprueba que puedes interactuar con la *API* y que esta responde como debe.

**Nota**: es posible que en todo este proceso te encuentres con algunos problemas y fallos que te volverán loco. La aplicación puede que funcione desde la parte del servidor, pero no del cliente; que los archivos estáticos no se sirvan y veas solo HTML; o al revés, que funcione el cliente, pero no las rutas de peticiones al servidor. Tranquilidad, siempre hay solución. Y es que depende mucho de las tecnologías que uses, de como estructures tu proyecto, de las versiones de dependencias, de fallos internos de la lógica de tu aplicación... por eso debes ser metódico a la hora de leer logs y errores, investigar y llegar a la solución para tu problema.