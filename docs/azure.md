# AZURE
![Azure](https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg)

Veamos los pasos para configurar Azure, tendréis que disponer de una cuenta para poder acceder al portal. Primero instalar Azure CLI y las funciones de Azure Functions (elegid la información del sistema operativo que tengáis)

[Instalar scoop en Capgemini](https://cca.capgemini.com/onboarding/#/primerosPasos)

[Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=zip) - ```scoop install azure-cli```

[Azure Functions Core tools](https://github.com/Azure/azure-functions-core-tools) - ```scoop install azure-functions-core-tools```

En el caso de que tengáis problemas con los permisos utilizad las opciones de ZIP de Azure CLI y de Azure Functions a través de npm (previamente debéis tener NodeJS y NPM que se dispone de acceso desde el catálogo de software)

## Creación del Proyecto
Comprobad que se tenga las siguientes dependencias instaladas:
* Node.js v18+ (```scoop install nodejs-lts```)
* Azure CLI
* Azure Functions Core Tools v4.0.5095+

Entonces en una carpeta donde vayáis a tener vuestro proyecto ejecutáis desde la consola:

```bash
func init SimpleHTTPendpoint --model v4
```

![Crear el proyecto](/docs/assets/step_1_init.png)

Seleccionamos `node` y `javascript`

Con esto tendremos nuestro proyecto de funciones creado. Ahora vamos a crear nuestra primera función

## Crear una nueva función

Navega a la carpeta del proyecto `cd SimpleHTTPendpoint` y crea una nueva función HTTP trigger:

Selecciona `HTTP trigger` y dale un nombre, por ejemplo, `hello`

![Crear una nueva función](/docs/assets/step_2_func_new.png)

Con esto ya tendremos nuestra primera función creada:

![Primera función creada](/docs/assets/step_3_func_created.png)

Ahora ejecutemos la función en modo local para poder desarrollar. En la carpeta de nuestro proyecto de funciones `SimpleHTTPendpoint` ejecutad:

```bash
func start
```

![Función levantada](/docs/assets/step_4_func_running.png)

Con esto ya hemos validado que nuestra función arranca y responde `http://localhost:7071/api/hello?name=capgemini`

![Salida de la función](/docs/assets/step_5_func_out.png)

## Desplegar la función en Azure
Ahora tenemos que generar un ZIP para subirlo y desplegar. Para ello crearemos un fichero zip que contendrá nuestra carpeta `src`, `node_modules`, el fichero `host.json` y `package.json`.

Cabe destacar que, para no subir las herramientas de desarrollo a Azure, en el fichero ZIP no debería ir `node_modules/azure-functions-core-tools`.

Para hacer este proceso podéis hacerlo en el explorador de archivos o bien por línea de comandos.

Para el explorador de archivos, cread una carpeta `dist` dentro de `SimpleHTTPendpoint` y ahí copiad los ficheros antes mencionados y quitad la carpeta de `node_modules` que no aplica.

En linea de comando:

```bash
mkdir dist
cp -r ./host.json ./package.json ./node_modules ./src ./dist
rm -r ./dist/node_modules/azure-functions-core-tools
cd dist
zip -r ../deploy.zip ./*
cd ..
```

Ahora tienes que configurar ciertos settings de la función requeridos por Azure:

Para ello tienes que identificarte con tu cuenta de Azure:

```bash
az login
```

![Azure Login](/docs/assets/step_6_az_login.png)

Se te abrirá el navegador para confirmar el usuario y te saldrán las suscripciones activas. Selecciona la que corresponda y ya puedes configurar tu función.

Ahora haremos ciertas acciones en el portal para crear la función y el grupo de recursos.

![Azure Portal](/docs/assets/step_7_azure_portal.png)

Ahí le damos a "Crear" -> Seleccionamos "Consumo" y accedemos a esta pantalla:

![Azure Function - Create](/docs/assets/step_8_azure_create_func.png)

Rellenamos el formulario siguiendo estas indicaciones (si no se indica dejar lo predefinido):
* Detalles de instancia -> Nombre de aplicación de funciones = os recomiendo workshop-{vuestronombre} (en mi caso sería worksop-gabi, si os da error es porque está ya utilizado, variad el nombre hasta conseguir uno disponible)
* Pila del entorno -> NodeJS
* Región -> North Europe

Importante recordad el nombre autogenerado del "Grupo de recursos" ```{name_group}``` y el "Nombre de la aplicación de funciones" ```{name_app}```, que lo utilizaremos más adelante.

Le damos a "Siguiente" hasta llegar a "Supervisión" y ahí la deshabilitamos.

Seguimos dando a "Siguiente" hasta llegar a la sección de "Revisar y crear". Si no hay ningún error se creará la instancia y podremos seguir con los siguientes pasos.

Una vez creado podremos terminar de configurar nuestra función vía CLI:

```bash
az functionapp config appsettings set --name {name_app} -g {name_group} --settings AzureWebJobsFeatureFlags=EnableWorkerIndexing
az functionapp config appsettings set --name {name_app} -g {name_group} --settings WEBSITE_RUN_FROM_PACKAGE=1
```

Y ya podremos mandar la función:

```bash
az functionapp deployment source config-zip -g {name_app} -n {name_group} --src ./deploy.zip
```

Con esto ya veremos nuestra aplicación de funciones y nuestra función cargada vía ZIP:

![Azure Function - Dashboard](/docs/assets/step_8_azure_create_func.png)

En mi caso, podremos ejecutar la llamada vía [https://workshopverano.azurewebsites.net/api/hello?name=capgemini](https://workshopverano.azurewebsites.net/api/hello?name=capgemini)

Y podremos acceder al código (SCM) a través de Kudu:
[https://workshopverano.scm.azurewebsites.net/](https://workshopverano.scm.azurewebsites.net/)

Si os dais cuenta la URL es en base al nombre de la aplicación de funciones que habéis dado de alta. Tenedlo en cuenta para apuntar a vuestra url de manera correcta.

Con esto ya podréis hacer "push" de los cambios realizados en vuestro código en vuestro IDE, ejecutar en local vuestras funciones y desplegarlas en Azure Functions.
