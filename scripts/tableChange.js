
const changeButton = document.getElementById('changeButton')
const table = document.getElementById("prac-table")
const tra = table.children //  HTML коллекция из thead и tbody
const trs = tra[1].children

const actices = ["Базовое бэкенд-приложение", "HTTP-запросы", "JSON и работа с ним", "HTTP-ответы", "Проектирование API", 
    "Роутинг и его настройка", "NoSQL базы данных", "Обеспечение авторизации и доступа пользователей",
    "Работа сторонних сервисов уведомления и авторизации", "Основы ReactJS", " Работа с компонентами динамической DOM",
    "Использование хуков в React", "Основы микросервисной архитектуры", "Разработка классических модулей веб-приложений"
]

function addActices() {
    for (let i = 0; i < trs.length; i++) {
        tds = trs[i].children
        tds[1].textContent = actices[i]
    }
}

changeButton.addEventListener("click", addActices)


// 3 задание
const lectureButton = document.getElementById("lecture-button");
const lectureTable = document.getElementById("lecture-table");
lectureTable.style.transition = "opacity 0.5s ease";
lectureTable.style.opacity = "0"; // Скрываем таблицу изначально

lectureButton.addEventListener("click", () => {
    if (lectureTable.classList.contains("visually-hidden")) {
        lectureTable.classList.remove("visually-hidden");
        setTimeout(() => {
            lectureTable.style.opacity = "1"; // Делаем таблицу видимой
        }, 0);
    } else {
        lectureTable.style.opacity = "0"; // Скрываем таблицу
        setTimeout(() => {
            lectureTable.classList.add("visually-hidden");
        }, 500); // Ждем завершения анимации перед скрытием
    }
});