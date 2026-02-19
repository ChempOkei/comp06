-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.4:3306
-- Время создания: Фев 19 2026 г., 07:09
-- Версия сервера: 8.4.6
-- Версия PHP: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `module_b`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add permission', 1, 'add_permission'),
(2, 'Can change permission', 1, 'change_permission'),
(3, 'Can delete permission', 1, 'delete_permission'),
(4, 'Can view permission', 1, 'view_permission'),
(5, 'Can add group', 2, 'add_group'),
(6, 'Can change group', 2, 'change_group'),
(7, 'Can delete group', 2, 'delete_group'),
(8, 'Can view group', 2, 'view_group'),
(9, 'Can add content type', 3, 'add_contenttype'),
(10, 'Can change content type', 3, 'change_contenttype'),
(11, 'Can delete content type', 3, 'delete_contenttype'),
(12, 'Can view content type', 3, 'view_contenttype'),
(13, 'Can add session', 4, 'add_session'),
(14, 'Can change session', 4, 'change_session'),
(15, 'Can delete session', 4, 'delete_session'),
(16, 'Can view session', 4, 'view_session'),
(17, 'Can add course', 5, 'add_course'),
(18, 'Can change course', 5, 'change_course'),
(19, 'Can delete course', 5, 'delete_course'),
(20, 'Can view course', 5, 'view_course'),
(21, 'Can add user', 6, 'add_user'),
(22, 'Can change user', 6, 'change_user'),
(23, 'Can delete user', 6, 'delete_user'),
(24, 'Can view user', 6, 'view_user'),
(25, 'Can add lesson', 7, 'add_lesson'),
(26, 'Can change lesson', 7, 'change_lesson'),
(27, 'Can delete lesson', 7, 'delete_lesson'),
(28, 'Can view lesson', 7, 'view_lesson'),
(29, 'Can add order', 8, 'add_order'),
(30, 'Can change order', 8, 'change_order'),
(31, 'Can delete order', 8, 'delete_order'),
(32, 'Can view order', 8, 'view_order');

-- --------------------------------------------------------

--
-- Структура таблицы `courses_course`
--

CREATE TABLE `courses_course` (
  `id` bigint NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL,
  `hours` int UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image` varchar(256) NOT NULL
) ;

--
-- Дамп данных таблицы `courses_course`
--

INSERT INTO `courses_course` (`id`, `name`, `description`, `hours`, `price`, `start_date`, `end_date`, `image`) VALUES
(2, 'asdfdas', 'None', 10, 100.00, '2026-12-11', '2026-12-22', '/static/mpic_32f377dc1bf7.jpeg');

-- --------------------------------------------------------

--
-- Структура таблицы `courses_lesson`
--

CREATE TABLE `courses_lesson` (
  `id` bigint NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `hours` int UNSIGNED NOT NULL,
  `video` varchar(200) NOT NULL,
  `course_id` bigint NOT NULL
) ;

--
-- Дамп данных таблицы `courses_lesson`
--

INSERT INTO `courses_lesson` (`id`, `name`, `description`, `hours`, `video`, `course_id`) VALUES
(4, 'asd', 'adsdas', 4, 'https://yout.com', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `courses_order`
--

CREATE TABLE `courses_order` (
  `id` bigint NOT NULL,
  `course_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `courses_user`
--

CREATE TABLE `courses_user` (
  `id` bigint NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(254) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `courses_user`
--

INSERT INTO `courses_user` (`id`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `is_staff`, `is_active`, `date_joined`, `password`, `email`) VALUES
(3, '2026-02-18 12:43:41.922444', 1, 'admin@edu.com', '', '', 1, 1, '2026-02-18 11:00:33.381242', 'pbkdf2_sha256$1000000$uQgoc4ZkMasuF75siRxRE1$HszGZrwIV2Yr+gd0RwNQZLIBTgEE1eBPV0RtCA+W/HE=', 'admin@edu.com');

-- --------------------------------------------------------

--
-- Структура таблицы `courses_user_groups`
--

CREATE TABLE `courses_user_groups` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `courses_user_user_permissions`
--

CREATE TABLE `courses_user_user_permissions` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(2, 'auth', 'group'),
(1, 'auth', 'permission'),
(3, 'contenttypes', 'contenttype'),
(5, 'courses', 'course'),
(7, 'courses', 'lesson'),
(8, 'courses', 'order'),
(6, 'courses', 'user'),
(4, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Структура таблицы `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2026-02-18 08:05:44.255604'),
(2, 'contenttypes', '0002_remove_content_type_name', '2026-02-18 08:05:44.333710'),
(3, 'auth', '0001_initial', '2026-02-18 08:05:44.536791'),
(4, 'auth', '0002_alter_permission_name_max_length', '2026-02-18 08:05:44.583651'),
(5, 'auth', '0003_alter_user_email_max_length', '2026-02-18 08:05:44.583651'),
(6, 'auth', '0004_alter_user_username_opts', '2026-02-18 08:05:44.599272'),
(7, 'auth', '0005_alter_user_last_login_null', '2026-02-18 08:05:44.599272'),
(8, 'auth', '0006_require_contenttypes_0002', '2026-02-18 08:05:44.599272'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2026-02-18 08:05:44.599272'),
(10, 'auth', '0008_alter_user_username_max_length', '2026-02-18 08:05:44.599272'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2026-02-18 08:05:44.614894'),
(12, 'auth', '0010_alter_group_name_max_length', '2026-02-18 08:05:44.614894'),
(13, 'auth', '0011_update_proxy_permissions', '2026-02-18 08:05:44.630515'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2026-02-18 08:05:44.630515'),
(15, 'courses', '0001_initial', '2026-02-18 08:05:45.054596'),
(16, 'sessions', '0001_initial', '2026-02-18 08:05:45.070234'),
(17, 'courses', '0002_alter_user_email_alter_user_password_and_more', '2026-02-18 08:07:07.071090'),
(18, 'courses', '0003_remove_user_email', '2026-02-18 08:09:27.513643'),
(19, 'courses', '0004_user_email', '2026-02-18 08:11:08.226487');

-- --------------------------------------------------------

--
-- Структура таблицы `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('ljj2hbnk0msoejsjrz87jd4v69hhl7rq', '.eJxVjDsOwjAQRO_iGlnxhw2mpM8ZrPXuBgeQI8VJhbg7jpQCimnmvZm3iritOW5VljixuiqnTr9dQnpK2QE_sNxnTXNZlynpXdEHrXqYWV63w_07yFhzW4uzYDvPo0CCnpJjsUQtFr2F0HccCMiJYaCzH61LgZtgsMGLQVKfL_v2OIU:1vsfIz:2DPKXP_KZIWtjKK-Lf_tc_63kxFs2F53x0rSuoKdIho', '2026-03-04 11:01:17.378912');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Индексы таблицы `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Индексы таблицы `courses_course`
--
ALTER TABLE `courses_course`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `courses_lesson`
--
ALTER TABLE `courses_lesson`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_lesson_course_id_16bc4882_fk_courses_course_id` (`course_id`);

--
-- Индексы таблицы `courses_order`
--
ALTER TABLE `courses_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_order_course_id_6ab9eb12_fk_courses_course_id` (`course_id`);

--
-- Индексы таблицы `courses_user`
--
ALTER TABLE `courses_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Индексы таблицы `courses_user_groups`
--
ALTER TABLE `courses_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `courses_user_groups_user_id_group_id_b5cd82da_uniq` (`user_id`,`group_id`),
  ADD KEY `courses_user_groups_group_id_f1b5c084_fk_auth_group_id` (`group_id`);

--
-- Индексы таблицы `courses_user_user_permissions`
--
ALTER TABLE `courses_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `courses_user_user_permis_user_id_permission_id_e0e9296d_uniq` (`user_id`,`permission_id`),
  ADD KEY `courses_user_user_pe_permission_id_5803efd0_fk_auth_perm` (`permission_id`);

--
-- Индексы таблицы `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Индексы таблицы `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `courses_course`
--
ALTER TABLE `courses_course`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `courses_lesson`
--
ALTER TABLE `courses_lesson`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `courses_order`
--
ALTER TABLE `courses_order`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `courses_user`
--
ALTER TABLE `courses_user`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `courses_user_groups`
--
ALTER TABLE `courses_user_groups`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `courses_user_user_permissions`
--
ALTER TABLE `courses_user_user_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Ограничения внешнего ключа таблицы `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Ограничения внешнего ключа таблицы `courses_lesson`
--
ALTER TABLE `courses_lesson`
  ADD CONSTRAINT `courses_lesson_course_id_16bc4882_fk_courses_course_id` FOREIGN KEY (`course_id`) REFERENCES `courses_course` (`id`);

--
-- Ограничения внешнего ключа таблицы `courses_order`
--
ALTER TABLE `courses_order`
  ADD CONSTRAINT `courses_order_course_id_6ab9eb12_fk_courses_course_id` FOREIGN KEY (`course_id`) REFERENCES `courses_course` (`id`);

--
-- Ограничения внешнего ключа таблицы `courses_user_groups`
--
ALTER TABLE `courses_user_groups`
  ADD CONSTRAINT `courses_user_groups_group_id_f1b5c084_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `courses_user_groups_user_id_c63786e3_fk_courses_user_id` FOREIGN KEY (`user_id`) REFERENCES `courses_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `courses_user_user_permissions`
--
ALTER TABLE `courses_user_user_permissions`
  ADD CONSTRAINT `courses_user_user_pe_permission_id_5803efd0_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `courses_user_user_pe_user_id_699dc51a_fk_courses_u` FOREIGN KEY (`user_id`) REFERENCES `courses_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
