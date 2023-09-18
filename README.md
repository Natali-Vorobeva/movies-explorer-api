# Movies-Explorer

Бэкенд дипломного проекта «Movies explorer» в рамках курса "Вэб-разработчик" Яндекс Практикума.


***
###  Описание ![](https://cdn.jsdelivr.net/gh/Readme-Workflows/Readme-Icons@main/icons/octicons/ApprovedChanges.svg)
Данный проект – серверная логика для объединения с фронтенд-частью дипломного проекта.   
Приложение предоставляет возможность регистрации пользователей с поиском фильмов на стороннем API и добавлением их в свой личный кабинет**.

** `проект прошел код-ревью`


### Функционал ![](https://cdn.jsdelivr.net/gh/Readme-Workflows/Readme-Icons@main/icons/octicons/ApprovedChanges.svg)
1. Регистрация и авторизация пользователей
2. Редактирование данных пользователя
3. Сохранение и удаление фильмов в личном кабинете
4. Обработка запросов на внешние API
6. Валидация данных
5. Логирование запросов к API
7. Централизованная обработка ошибок при обработке данных
8. Выпуск и проверка токенов

### Технологии ![](https://cdn.jsdelivr.net/gh/Readme-Workflows/Readme-Icons@main/icons/octicons/ApprovedChanges.svg)
* Express.js
* Node.js
* JavaScript
* JWT
* MongoDB
* celebrate
* validator
* bcryptjs
* jsonwebtoken
* winston
* express-winston
* helmet
* dotenv
* cors
* NGINX
* eslint

### Инструкция ![](https://cdn.jsdelivr.net/gh/Readme-Workflows/Readme-Icons@main/icons/octicons/ApprovedChanges.svg)
Клонировать проект, установить зависимости:
```
git clone https://github.com/Natali-Vorobeva/movies-explorer-api.git
cd movies-explorer-api
npm install
```
Запустить сервер:   
```
npm run start
```
Запустить сервер с hot-reload
```
npm run dev
```
Открыть в браузере http://localhost:3000


### Запросы к серверу ![](https://cdn.jsdelivr.net/gh/Readme-Workflows/Readme-Icons@main/icons/octicons/ApprovedChanges.svg)
| Путь 	| Тип запроса 	| Ответ сервера 	|
|---	|---	|---	|
| /users/me 	| GET 	| Данные текущего пользователя 	|
|  	| PATCH 	| Изменение name и email текущего пользователя 	|
| /movies 	| GET 	| Список всех сохраненных пользователем фильмов 	|
| /movies/:moviesId 	| DELETE 	| Удаление фильма по Id 	|
| /signup 	| POST 	| Регистрация аккаунта 	|
| /signin 	| POST 	| Вход в аккаунт с помощью email и пароля 	|
| /signout 	| POST 	| Выход из аккаунта 	|



### Ссылки ![](https://cdn.jsdelivr.net/gh/Readme-Workflows/Readme-Icons@main/icons/octicons/ApprovedChanges.svg)

[Репозиторий с фронтендом дипломной работы](https://github.com/Natali-Vorobeva/movies-explorer-frontend.git)

***
***
***

