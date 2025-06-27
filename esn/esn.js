        // Основные функции приложения
        
        /**
         * Загрузка данных из JSON-файла
         * 
         * Эта функция асинхронно загружает данные из файла data.json
         * Обрабатывает возможные ошибки загрузки и парсинга
         */
        async function loadData() {
            try {
                // Показываем индикатор загрузки
                document.getElementById('loader').style.display = 'block';
                document.getElementById('error-message').style.display = 'none';
                
                // Выполняем запрос к файлу data.json
                const response = await fetch('esnEnd.json');
                
                // Проверяем статус ответа
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
                }
                
                // Парсим JSON-данные
                const data = await response.json();
                
                // Скрываем индикатор загрузки
                document.getElementById('loader').style.display = 'none';
                
                // Генерируем навигацию и контент
                generateNavigation(data.ЭСН);
                generateContent(data.ЭСН);
                
                // Активируем первый элемент навигации
                if (data.ЭСН.length > 0) {
                    const firstCode = data.ЭСН[0]['Шифр ЭСН'].replace(/[.-]/g, '-');
                    document.querySelector(`.nav-item[data-target="${firstCode}"]`).classList.add('active');
                    
                    // Прокручиваем к первому элементу
                    setTimeout(() => scrollToWork(firstCode), 300);
                }
                
            } catch (error) {
                // Обработка ошибок
                document.getElementById('loader').style.display = 'none';
                const errorMessage = document.getElementById('error-message');
                errorMessage.style.display = 'block';
                errorMessage.innerHTML = `
                    <h3>Ошибка загрузки данных</h3>
                    <p>${error.message}</p>
                    <p>Проверьте:</p>
                    <ul>
                        <li>Файл data.json существует в той же папке</li>
                        <li>Файл содержит валидные JSON-данные</li>
                        <li>Формат данных соответствует ожидаемому</li>
                        <li>Сервер разрешает доступ к файлу</li>
                    </ul>
                `;
                console.error('Ошибка загрузки данных:', error);
            }
        }
        
        /**
         * Генерация навигационной панели
         * 
         * @param {Array} works - Массив объектов ЭСН
         * 
         * Создает список шифров ЭСН для навигации по странице
         */
        function generateNavigation(works) {
            let navHTML = '';

            
            
            works.forEach(work => {
                // Создаем валидный HTML-идентификатор из шифра
                const anchor = work['Шифр ЭСН'];

                // Формируем HTML для элемента навигации
                navHTML += `
                    <div class="nav-item" 
                         data-target="${anchor}" 
                         onclick="scrollToWork('${anchor}')">
                        <p class = "nav-h">${work['Шифр ЭСН']}</p>
                        <p class = "nav-u">${work['Ед']}</p>
                        <p class = "nav-p">${work.Работа}</p>
                    </div>
                `;
            });
            
            // Вставляем сгенерированную навигацию в DOM
            document.getElementById('nav-list').innerHTML = navHTML;
        }
        
        /**
         * Генерация контента страницы
         * 
         * @param {Array} works - Массив объектов ЭСН
         * 
         * Создает карточки для каждого ЭСН с возможностью просмотра различных ресурсов
         */
        function generateContent(works) {
            let contentHTML = '';
            
            works.forEach(work => {
                // Создаем валидный HTML-идентификатор из шифра
                const anchor = work['Шифр ЭСН'];
                
                // Определяем доступные разделы ресурсов
                const resourceSections = [
                    'Трудозатраты', 'Материалы', 'Машины', 
                    'Расход оборудования', 'Капитальный ремонт'
                ].filter(section => work[section] && work[section].length > 0);
                
                // Генерируем кнопки вкладок
                let tabsHTML = '';
                let tabContentHTML = '';



                
                resourceSections.forEach((section, index) => {

                                  // Добавляем к ресурсам эмодзи
                function emojyAdd (section) {
                  if (section == "Трудозатраты") {
                    return section ="👷Трудозатраты"
                  } 
                  else if (section == "Машины") {
                    return section = "🏗Машины"
                  }
                  else if (section == "Материалы") {
                    return section = "🔩Материалы"
                  }
                  else if (section == "Расход оборудования") {
                    return section = "🚜Расход оборудования"
                  }
                  else if (section == "Капитальный ремонт") {
                    return section = "🛠Капитальный ремонт"
                  }
                };
                    console.log(emojyAdd(section));
                    //console.log(section.replace(emojyAdd(section)));
                    // HTML для контента вкладки
                    tabContentHTML += `
                    <p class = "workTypeHeader">${emojyAdd(section)}</p>    
                    <div class="resource-tabs">
                      ${generateResourceTable(work[section])}
                    </div>
                    `;
                });


                
                // Формируем HTML для карточки ЭСН
                contentHTML += `
                    <div id="${anchor}" class="work-card">
                        <div class="work-header">
                            <h2 class="work-title">${work.Работа}</h2>
                            <div class="work-meta">
                                <div class="work-code">${work['Шифр ЭСН']}</div>
                                <div class="work-unit">${work.Ед}</div>
                            </div>
                        </div>

                        ${tabContentHTML}
                    </div>
                `;
            });
            
            // Вставляем сгенерированный контент в DOM
            document.getElementById('content').innerHTML = contentHTML;
        }
        
        /**
         * Генерация таблицы ресурсов
         * 
         * @param {Array} resources - Массив ресурсов
         * @returns {string} HTML таблицы ресурсов
         */
        function generateResourceTable(resources) {
            // Проверяем наличие данных
            if (!resources || resources.length === 0) {
                return '<p>Нет данных для отображения</p>';
            }
            
            // Генерируем строки таблицы
            let rowsHTML = '';
            resources.forEach(resource => {
                rowsHTML += `
                    <tr>
                        <td class="resource-name">${resource.Наименование}</td>
                        <td>${resource['Ед. изм.'] || '-'}</td>
                        <td class="resource-value">${resource['Ресурс на ед. изм.']}</td>
                        <td>${resource.Шифр || '-'}</td>
                    </tr>
                `;
            });
            
            // Возвращаем HTML таблицы
            return `
                <table class="resource-table">
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Ед. изм.</th>
                            <th>Ресурс</th>
                            <th>Шифр</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHTML}
                    </tbody>
                </table>
            `;
        }
        
        /**
         * Переключение вкладок ресурсов
         * 
         * @param {HTMLElement} button - Нажатая кнопка вкладки
         * @param {string} tabId - Идентификатор контента вкладки
         */
        function switchTab(button, tabId) {
            // Находим контейнер вкладок
            const tabsContainer = button.closest('.resource-tabs');
            
            // Убираем активное состояние у всех кнопок в этой группе вкладок
            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Добавляем активное состояние текущей кнопке
            button.classList.add('active');
            
            // Находим контейнер контента вкладок
            const contentContainer = tabsContainer.nextElementSibling;
            
            // Скрываем все контенты вкладок
            contentContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Показываем выбранный контент
            document.getElementById(tabId).classList.add('active');
        }
        
        /**
         * Прокрутка к элементу ЭСН
         * 
         * @param {string} anchor - Идентификатор элемента
         */
        function scrollToWork(anchor) {
            const element = document.getElementById(anchor);
            if (element) {
                // Убираем предыдущее выделение
                document.querySelectorAll('.highlight').forEach(el => {
                    el.classList.remove('highlight');
                });
                
                // Прокручиваем к элементу
                element.scrollIntoView({behavior: 'smooth', block: 'start'});
                
                // Добавляем временное выделение
                element.classList.add('highlight');
                
                // Обновляем активный элемент в навигации
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelector(`.nav-item[data-target="${anchor}"]`).classList.add('active');
            }
        }
        
        // Делаем функции доступными глобально для обработчиков событий
        window.switchTab = switchTab;
        window.scrollToWork = scrollToWork;
        
        // Загрузка данных при запуске приложения
        document.addEventListener('DOMContentLoaded', loadData);