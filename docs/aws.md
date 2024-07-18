# AWS
![AWS](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/AWS_Simple_Icons_AWS_Cloud.svg/320px-AWS_Simple_Icons_AWS_Cloud.svg.png)

Veamos los pasos para configurar AWS, tendréis que disponer de una cuenta para poder acceder al portal. Primero instalar AWS CLI y las funciones SAM CLI AWS Serverless Application Model Command Line Interface (elegid la información del sistema operativo que tengáis)

[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

[SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

## Creación del Proyecto
Comprobad que se tenga las siguientes dependencias instaladas:
* AWS CLI ```scoop install aws```
* AWS SAM CLI ```scoop install aws-sam-cli```

Entonces en una carpeta donde vayáis a tener vuestro proyecto ejecutáis desde la consola:

```bash
sam init
```
