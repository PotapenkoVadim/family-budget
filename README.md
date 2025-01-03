# Family Budget App
##### Версия: 1.1.0
##### Платформа: Web/Android/Desktop
##### Технологии:
- Frontend: Vue, Pinia, VueRouter
- Backend: Low-code platform [Supabase](https://supabase.com/)
- Для компиляции бинарных приложений используется фреймворк [Tauri](https://v2.tauri.app/)
### Описание
Приложение предназначено для удобного управления личными финансами. Позволяет пользователям вести учет всех своих финансовых операций, анализировать расходы и доходы, а также планировать бюджет. Пользователи могут добавлять записи о доходах и расходах, указывая сумму, категорию, дату и комментарии к каждой операции. Приложение позволяет анализировать финансовые операции в рамках указанного месяца или года. 

> [!IMPORTANT] 
> Приложение создано для личного использования автора, однако другие пользователи могут зарегистрироваться и протестировать его в роли временных пользователей. При этом автор не гарантирует сохранность их данных.
### Тестирование
Протестировать приложение можно на следующих платформах:

- Web client: [Family budget app](https://potapenkovadim.github.io/family-budget/)
- Telegram MiniApps: @potapenko_budget_bot
### Сборка
Для корректной сборки приложение необходимо создать `.env` файл в корне директории, в которой будут хранится ключ и урл для подключения Supabase (`VITE_SUPABASE_URL` и `VITE_SUPABASE_KEY`).

Сборка Web-клиента:
```sh
yarn build
```
Сборка Desktop-клиента:
```sh
yarn tauri build
# or
cargo tauri build
```
Сборка Android-клиента (apk файл). Для корректной сборки android клиента необходимо сгенерировать ключ для подписи приложения. Подробнее по [ссылке](https://v2.tauri.app/distribute/sign/android/)
```sh
yarn tauri android build --apk
# or
cargo tauri android build --apk
```