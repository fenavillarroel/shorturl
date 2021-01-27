# Descripción.

Simple acortador de URL. Desarrollado con nodejs y mongodb.


## Dependencias.

* docker 
* docker-compose

## Instalación 

```
git clone https://github.com/fenavillarroel/shorturl.git
cd shorturl 
docker-compose up -d
```

## API

1. Dada una URL larga, el servicio devuelve una URL corta..

```http
POST http://melicl.ddns.net:8000/api/v1/url
```


| Headers| Parametros body | Response |
| :--- | :--- | :--- |
| "Content-type":"application/json" | {"url":"ejemplourl.com"} |"shortUrl":"localhost:8000/idbj9b6"|

2. Dada una URL corta, el servicio devuelve la URL larga original.

```http
GET http://melicl.ddns.net:8000/api/v1/url
```


| Headers| Parametros body | Response |
| :--- | :--- | :--- |
| "Content-type":"application/json" | {"url":"localhost:8000/idbj9b6"} |"Url Original":"ejemplourl.com"|

3. Eliminar URL corta

```http
DELETE http://melicl.ddns.net:8000/api/v1/url
```


| Headers| Parametros body | Response |
| :--- | :--- | :--- |
| "Content-type":"application/json" | {"url":"localhost:8000/idbj9b6"} |{"URL Eliminada":"localhost:8000/idbj9b6"}|

4. Estadisticas de una URL corta.

```http
GET http://melicl.ddns.net:8000/api/v1/url/stats/{id}
```


| Headers| Parametro| Response |
| :--- | :--- | :--- |
| "Content-type":"application/json" |id URL corta|JSON Documento URL corta|
