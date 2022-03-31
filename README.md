# Repositorio de entrega final de Santiago Vittor para Programación Backend en CoderHouse

_En este repositorio se subirán los archivos correspondientes a las entregas del proyecto final de programación backend para CoderHouse_

## De momento 📋

```
Pre-entrega número 2 : Clase 20 DbaaS & Firebase
```

## Descripción

Se puede cambiar la persistencia alternando el valor de la variable 'dbToUse' del archivo index.js ubicado en la carpeta daos entre 'fs' y 'mongo'.
Es posible aplicar los mismos métodos para ambas.

## Rutas ℹ️	


### En la versión actual puedes interactuar con las siguientes rutas: 

#### Carrito:

```
/api/cart
```
Con el método POST se generan distintos carritos con su correspondiente ID.
Con el método DELETE puedes eliminar todos los carritos creados en caso de que existan.


```
/api/cart/:id
```
Con el método DELETE se puede eliminar un carrito pasando su id por params.

```
/api/cart/:id/productos
```

Con el método GET puedes obtener los productos de un carrito si pasas su id por params.
Con el método POST puedes agregar un producto al carrito cuya id selecciones por params.

```
/api/cart/:id/productos/:id_prod
```

Con el método DELETE puedes eliminar un producto del carrito que selecciones.


#### Productos:

```
/api/products
```
Con el método GET puedes obtener un listado de los productos existentes al momento de la consulta.
Con el método POST puedes agregar un producto al listado siempre y cuando el mismo conste de todos los atributos solicitados(name, description,thumbnail, stock, code y price).
Con el método DELETE puedes eliminar todos los productos del listado.

```
/api/products/:id
```
Con el método GET puedes obtener el producto que desees seleccionando su id a través de params.
Con el método DELETE puedes eliminar el producto que desees siguiendo la misma lógica.


## Autor ✒️

* **Santiago Vittor** - *Sitio Web* - [santiagoVittorWeb](https://santiagovittorweb.vercel.app/)
