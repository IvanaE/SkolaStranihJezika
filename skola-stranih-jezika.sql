-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: skola-stranih-jezika
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cas`
--

DROP TABLE IF EXISTS `cas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cas` (
                       `id` bigint NOT NULL AUTO_INCREMENT,
                       `napomena` varchar(255) DEFAULT NULL,
                       `status` int DEFAULT NULL,
                       `id_korisnik` bigint NOT NULL,
                       `id_rezervacija` bigint NOT NULL,
                       PRIMARY KEY (`id`),
                       UNIQUE KEY `UK_ci4bk62ddi8c8tb3xj88qm3l3` (`id_rezervacija`),
                       UNIQUE KEY `UK_4egkdieu4w5t90ur86v1432a` (`id_rezervacija`),
                       KEY `FKbmcaf578myfraip989wvamrh4` (`id_korisnik`),
                       CONSTRAINT `FK1wbq9waedqais2u9r2ylx6unf` FOREIGN KEY (`id_rezervacija`) REFERENCES `rezervacija` (`id`),
                       CONSTRAINT `FKbmcaf578myfraip989wvamrh4` FOREIGN KEY (`id_korisnik`) REFERENCES `korisnici` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cas`
--

LOCK TABLES `cas` WRITE;
/*!40000 ALTER TABLE `cas` DISABLE KEYS */;
INSERT INTO `cas` VALUES (2,'Bili ste odlični. Za zadaću pokušajte da napišete 5 rečenica i u njima da koristite nove reči!',2,7,26),(3,'You did a great job! Try to make sentences with new words.',0,7,27),(4,NULL,2,7,28),(5,'',1,7,33),(6,'',3,7,31),(7,NULL,2,7,34),(8,'',0,8,35);
/*!40000 ALTER TABLE `cas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filijala`
--

DROP TABLE IF EXISTS `filijala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filijala` (
                            `id` bigint NOT NULL AUTO_INCREMENT,
                            `address` varchar(255) NOT NULL,
                            `city` varchar(255) NOT NULL,
                            `name` varchar(255) NOT NULL,
                            `phone` varchar(255) NOT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filijala`
--

LOCK TABLES `filijala` WRITE;
/*!40000 ALTER TABLE `filijala` DISABLE KEYS */;
INSERT INTO `filijala` VALUES (1,'Kralja Petra I, br3','Zrenjanin','ZR - Cambridge 1','+38123541344'),(3,'Augusta Cesarca 1','Novi Sad','NS - Cambridge 1','+38123161581'),(4,'Ćirpanova 5','Novi Sad','NS - Cambridge 2','+381215445878'),(5,'Jurija Gagarina 231','Beograd','BG - Cambridge 1','+3813456789'),(6,'Sarajlijina 5A','Zrenjanin','ZR - Cambridge 2','+381987654321'),(7,'Kraljice Marije 47/7','Beograd','BG - Cambridge 2','+38165437892');
/*!40000 ALTER TABLE `filijala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnici`
--

DROP TABLE IF EXISTS `korisnici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnici` (
                             `id` bigint NOT NULL AUTO_INCREMENT,
                             `address` varchar(255) DEFAULT NULL,
                             `email` varchar(255) DEFAULT NULL,
                             `first_name` varchar(255) NOT NULL,
                             `last_name` varchar(255) NOT NULL,
                             `phone` varchar(255) DEFAULT NULL,
                             `enabled` bit(1) DEFAULT NULL,
                             `password` varchar(255) NOT NULL,
                             `username` varchar(255) NOT NULL,
                             `id_filijala` bigint DEFAULT NULL,
                             PRIMARY KEY (`id`),
                             UNIQUE KEY `UK_fnhlgpdv9nwggcetnb4hadcdi` (`username`),
                             KEY `FKat5hl69fvb1pnk2ivdewengla` (`id_filijala`),
                             CONSTRAINT `FKat5hl69fvb1pnk2ivdewengla` FOREIGN KEY (`id_filijala`) REFERENCES `filijala` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnici`
--

LOCK TABLES `korisnici` WRITE;
/*!40000 ALTER TABLE `korisnici` DISABLE KEYS */;
INSERT INTO `korisnici` VALUES (6,'Ravnogorska 84, Novi Sad','luka.kovacevic@tfzr.rs','Marko','Marković','+381652257878',_binary '','$2a$10$3czotj5V.fOaAAyTEr/WluPLmVYnkRmVkBP1COeOYJ7Rzun4VfsX.','marko',3),(7,'ica','ica@gmail.com','ica','ica','0613061994',_binary '','$2a$10$3czotj5V.fOaAAyTEr/WluPLmVYnkRmVkBP1COeOYJ7Rzun4VfsX.','ica',1),(8,'Despota Stefana 1','zr1@yahoo.com','Sara','Saric','0613333333',_binary '','$2a$10$adFMnhrgFeczzI/rS5MwZ.BhEdz4dnwGMBJVO8pcD9LSO8Q7xn4su','zrenjanin1',1),(9,'Urosa Predica1','zr2@yahoo.com','Ivan','Ivanovic','0614444444',_binary '','$2a$10$yVPe0wOWOmjN1PT65803EeJD4hmdosJTIAXseOqzmUdh4ceaU6.q2','zrenjanin2',6),(10,'Ive Vojnovica 3','ns1@yahoo.com','Luka','Lukic','0615555555',_binary '','$2a$10$hgVz2IbLbRply2JRLAMaWOsOBFZy0.Tns1C.CDkgS2tbLTjUf2sFy','novisad1',3),(11,'Mileticeva 4','ns2@yahoo.com','Tamara','Tatar','0617777777',_binary '','$2a$10$ee2LvHy5OHhbbduDFO7Tqut75T3b/qZ2RgJhuhF6D3Q.gsaESrZ8q','novisad2',4),(12,'Zarka Tunjinskog 3','bg1@yahoo.com','Stefan','Stefanovic','0628888888',_binary '','$2a$10$oA.uQw2DdFD9WqbaticFtOh/imrVpw9zfJ8YqvdH9PEYBCwLAjLR6','beograd1',5),(13,'Sinđelićeva 4','bg2@yahoo.com','Vuk','Vukovic','0647777777',_binary '','$2a$10$TKOkiq0mb591o0ghtpU3u.L0Nc/UA9aP1y7GQQ1et0/AiDHFGXiOK','beograd2',7);
/*!40000 ALTER TABLE `korisnici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik_uloga`
--

DROP TABLE IF EXISTS `korisnik_uloga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik_uloga` (
                                  `id_korisnik` bigint NOT NULL,
                                  `uloge` int NOT NULL,
                                  KEY `FKhok9ofuuf3excajfxxnppryqw` (`id_korisnik`),
                                  CONSTRAINT `FKhok9ofuuf3excajfxxnppryqw` FOREIGN KEY (`id_korisnik`) REFERENCES `korisnici` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik_uloga`
--

LOCK TABLES `korisnik_uloga` WRITE;
/*!40000 ALTER TABLE `korisnik_uloga` DISABLE KEYS */;
INSERT INTO `korisnik_uloga` VALUES (6,0),(7,1),(9,0),(8,0),(11,0),(12,0),(13,0),(10,0);
/*!40000 ALTER TABLE `korisnik_uloga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nastavnik`
--

DROP TABLE IF EXISTS `nastavnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nastavnik` (
                             `id` bigint NOT NULL AUTO_INCREMENT,
                             `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                             `picture` text,
                             `price` double NOT NULL,
                             `id_filijala` bigint NOT NULL,
                             `about` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                             `sertifikati` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                             PRIMARY KEY (`id`),
                             KEY `FKrj1j09c2o78hxo6hn0andu2j1` (`id_filijala`),
                             CONSTRAINT `FKrj1j09c2o78hxo6hn0andu2j1` FOREIGN KEY (`id_filijala`) REFERENCES `filijala` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nastavnik`
--

LOCK TABLES `nastavnik` WRITE;
/*!40000 ALTER TABLE `nastavnik` DISABLE KEYS */;
INSERT INTO `nastavnik` VALUES (3,'Teacher Ann','https://sightsbetterseen.com/wp-content/uploads/2020/11/VIPKID-Teacher-Requirements-1.jpg',1500,1,'Hello, my name is Ann and I have been teaching English for over 3 years. I have experience with children starting from 5 years old and with adults. I am completing my bachelor\'s degree in International Relations and Law including Translation','TEFL, TESOL, TEYOL'),(4,'Teacher Jess','https://cta.school/wp-content/uploads/2023/09/PereaJessica-scaled.jpg',2500,1,'I am Jess and I am from the USA. I have been teaching English online for over nine years now. I am friendly, dynamic, and resourceful when teaching my students.','TEFL'),(5,'Teacher Nico','https://img2.chinadaily.com.cn/images/201810/04/5bb552f5a310eff368ff95b2.jpeg',800,3,'Beyond teaching, I love spending my free time reading books, singing, and dancing. I believe that reading helps me discover new ideas, while singing and dancing allow me to express myself creatively and stay energized.','TEYOL'),(6,'Teacher Ivy','https://i0.wp.com/meghanthetravelingteacher.com/wp-content/uploads/2024/03/537_file.png?w=1194&ssl=1',3500,3,'Hello! My name is teacher Ivy. I\'ve been teaching English to students ages 4 to 50 years old since 2018. I am friendly and outgoing.  See you.','TEFL, TEYOL'),(7,'Teacher George','https://allright.com/avatars/user-921813/150x150.jpg?timestamp=1715265816517',500,5,'Hello, I am teacher George and I have one year of teaching experience. I am a Bachelor of Computer Science. I teach children aged 5 to 14.','TEFL,TEYOL'),(8,'Teacher Eli','https://avatars.preply.com/i/logos/i/logos/avatar_yeedbl2sn7.jpg',1500,5,'I live in England ( Cambridge) and teach the way I’d like to be taught.','TEFL'),(9,'Teacher Tany','https://avatars.preply.com/i/logos/i/logos/avatar_st45h36kpsr.jpg',1000,6,'Hi there I am Tanya - I am a TEFL-certified English teacher and IELTS certified teacher! I plan each lesson according to my student\'s skills and requirements.','TEFL'),(10,'Teacher Elsa','https://avatars.preply.com/i/logos/i/logos/avatar_0kvcdqim4l8.jpg',2000,6,'Make your English learning journey a PRIORITY IN 2024!!! I specialise in exam preparation, vocabulary and grammar in practical and fun ways.','TEFL'),(11,'Teacher Jenn','https://avatars.preply.com/i/logos/i/logos/avatar_j5o9cpntduo.jpg',900,4,' I am an English teacher with over 10 years of teaching experience. I have been working at University (YSU IB) for 6 years now.','TEFL'),(12,'Teacher Marco','https://avatars.preply.com/i/logos/i/logos/avatar_grs91t80re.jpg',1800,4,'Hi, I\'m Mark! I\'m originally from the United Kingdom. I left the UK at the age of 25 to live and work in Australia and New Zealand.','TEFL'),(13,'Teacher Alex','https://avatars.preply.com/i/logos/i/logos/avatar_9em9azsd6fd.jpg',2000,7,'I have experience working as a cabin crew for international company, so I’ve travelled a lot and ready to discuss many different topics and share my experience.','TEFL'),(14,'Teaher Rachelc','https://avatars.preply.com/i/logos/i/logos/avatar_ocp5olvmto.jpg',800,7,'My name is Rachel and I am a native English speaker from London! I have a degree in English and American Literature from the University of Kent.','TEFL, TEYOL, TESOL');
/*!40000 ALTER TABLE `nastavnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nastavnik_nivoi`
--

DROP TABLE IF EXISTS `nastavnik_nivoi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nastavnik_nivoi` (
                                   `id_nastavnik` bigint NOT NULL,
                                   `id_nivo` bigint NOT NULL,
                                   KEY `FKo52fagbr1next32tl7dai06qc` (`id_nivo`),
                                   KEY `FKkav5k50vibrh5vcdujd5jstua` (`id_nastavnik`),
                                   CONSTRAINT `FKkav5k50vibrh5vcdujd5jstua` FOREIGN KEY (`id_nastavnik`) REFERENCES `nastavnik` (`id`),
                                   CONSTRAINT `FKo52fagbr1next32tl7dai06qc` FOREIGN KEY (`id_nivo`) REFERENCES `nivo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nastavnik_nivoi`
--

LOCK TABLES `nastavnik_nivoi` WRITE;
/*!40000 ALTER TABLE `nastavnik_nivoi` DISABLE KEYS */;
INSERT INTO `nastavnik_nivoi` VALUES (3,5),(3,6),(4,7),(4,6),(4,10),(4,8),(5,5),(5,8),(5,10),(5,6),(7,5),(7,6),(8,7),(8,8),(8,10),(6,5),(6,6),(6,7),(6,8),(10,10),(10,7),(10,8),(10,6),(10,5),(11,6),(11,7),(11,5),(11,8),(11,10),(12,5),(12,7),(12,6),(12,8),(12,10),(13,5),(13,6),(13,7),(13,8),(13,10),(14,5),(14,7),(14,8),(14,10),(14,6),(9,5),(9,6),(9,8),(9,7),(9,10);
/*!40000 ALTER TABLE `nastavnik_nivoi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivo`
--

DROP TABLE IF EXISTS `nivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nivo` (
                        `id` bigint NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) NOT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivo`
--

LOCK TABLES `nivo` WRITE;
/*!40000 ALTER TABLE `nivo` DISABLE KEYS */;
INSERT INTO `nivo` VALUES (5,'Starter'),(6,'Basic'),(7,'Intermediate'),(8,'Advanced'),(10,'Master');
/*!40000 ALTER TABLE `nivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rezervacija`
--

DROP TABLE IF EXISTS `rezervacija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rezervacija` (
                               `id` bigint NOT NULL AUTO_INCREMENT,
                               `address` varchar(255) DEFAULT NULL,
                               `email` varchar(255) DEFAULT NULL,
                               `first_name` varchar(255) NOT NULL,
                               `last_name` varchar(255) NOT NULL,
                               `phone` varchar(255) DEFAULT NULL,
                               `napomena` varchar(255) NOT NULL,
                               `nivo` varchar(255) NOT NULL,
                               `rezervacija_datum` datetime(6) NOT NULL,
                               `id_termin` bigint DEFAULT NULL,
                               PRIMARY KEY (`id`),
                               KEY `FKm25bfqbmg5bivym7mt3u7x2ec` (`id_termin`),
                               CONSTRAINT `FKm25bfqbmg5bivym7mt3u7x2ec` FOREIGN KEY (`id_termin`) REFERENCES `termin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rezervacija`
--

LOCK TABLES `rezervacija` WRITE;
/*!40000 ALTER TABLE `rezervacija` DISABLE KEYS */;
INSERT INTO `rezervacija` VALUES (26,'4. jul 45','elez242@gmail.com','Ivana','Elez','0613061994','vokabular','basics','2024-09-26 19:13:57.705634',232),(27,'zorana borovine 41','elez242@gmail.com','sara','stankovic','06154545454','gramatika','starter','2024-09-26 20:35:44.605674',179),(28,'4. jul 46/3','elez242@gmail.com','luka','kovacevic','06266644455','konverzaciju','napordan nivo','2024-09-26 20:36:38.286126',178),(29,'Salke Nayecica 5','elez242@gmail.com','stefan','stevic','06012435634634','vokabular','srednji ','2024-09-26 20:37:25.558229',207),(31,'Hadzirumanova 3','elez242@gmail.com','Snezana','Maric','0626664234355','konverzaciju','napordan nivo','2024-09-26 20:47:29.155302',279),(32,'Bulevar oslobodjenja 3','elez242@gmail.com','Jovan','Jovic','06266624565','gramatika','srednji ','2024-09-26 20:48:08.712367',262),(33,'4. juli 47/3','elez242@gmail.com','Zorica','Zoric','06266643678','vokabular','starter','2024-09-26 21:26:26.845071',141),(34,'Polgara Andresa 4','elez242@gmail.com','Aleksandar','Aleksic','06012335790','konverzaciju','srednji ','2024-09-26 21:27:06.559974',145),(35,'Augusta Cesarca 3','elez242@gmail.com','Vuk','Vukic','06266634567','konverzaciju','master','2024-09-26 21:50:20.651180',149),(36,'Zorana Borovine 13','elez242@gmail.com','Nina','Nikolic','06263636363','vokabular','basics','2024-09-26 21:51:07.672919',137),(37,'4. jul 12/22','elez242@gmail.com','Ana','Anic','061564545465','vokabular','srednji ','2024-09-26 21:51:53.398089',245),(38,'4. jul 45/4','elez242@gmail.com','Ana','Ann','0613061994324','vokabular','Intermediate','2024-09-26 22:25:03.607577',219);
/*!40000 ALTER TABLE `rezervacija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `termin`
--

DROP TABLE IF EXISTS `termin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `termin` (
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `termin_vreme` datetime(6) NOT NULL,
                          `id_nastavnik` bigint NOT NULL,
                          PRIMARY KEY (`id`),
                          KEY `FK4c80aewqq6lw4hs3558iy9mnq` (`id_nastavnik`),
                          CONSTRAINT `FK4c80aewqq6lw4hs3558iy9mnq` FOREIGN KEY (`id_nastavnik`) REFERENCES `nastavnik` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `termin`
--

LOCK TABLES `termin` WRITE;
/*!40000 ALTER TABLE `termin` DISABLE KEYS */;
INSERT INTO `termin` VALUES (131,'2024-09-27 15:00:00.000000',3),(132,'2024-09-27 16:00:00.000000',3),(133,'2024-09-27 16:00:00.000000',3),(134,'2024-09-27 17:00:00.000000',3),(135,'2024-09-27 18:00:00.000000',3),(137,'2024-09-28 17:00:00.000000',3),(138,'2024-09-28 18:00:00.000000',3),(139,'2024-09-28 19:00:00.000000',3),(140,'2024-09-29 16:00:00.000000',3),(141,'2024-09-29 17:00:00.000000',3),(142,'2024-09-29 18:00:00.000000',3),(143,'2024-09-29 19:00:00.000000',3),(144,'2024-09-26 20:00:00.000000',3),(145,'2024-09-30 20:00:00.000000',3),(146,'2024-09-30 21:00:00.000000',3),(147,'2024-09-30 17:00:00.000000',3),(149,'2024-09-28 17:00:00.000000',4),(150,'2024-09-29 17:00:00.000000',4),(151,'2024-09-30 17:00:00.000000',4),(152,'2024-10-01 17:00:00.000000',4),(154,'2024-09-27 10:00:00.000000',4),(155,'2024-09-28 10:00:00.000000',4),(156,'2024-09-29 10:00:00.000000',4),(157,'2024-09-30 10:00:00.000000',4),(158,'2024-10-01 10:00:00.000000',4),(159,'2024-09-27 11:00:00.000000',4),(160,'2024-09-28 11:00:00.000000',4),(161,'2024-09-29 11:00:00.000000',4),(162,'2024-09-30 11:00:00.000000',4),(163,'2024-10-01 11:00:00.000000',4),(164,'2024-09-27 18:00:00.000000',4),(165,'2024-09-28 18:00:00.000000',4),(166,'2024-09-29 18:00:00.000000',4),(167,'2024-09-30 18:00:00.000000',4),(168,'2024-09-27 16:00:00.000000',5),(169,'2024-09-28 16:00:00.000000',5),(170,'2024-09-29 16:00:00.000000',5),(171,'2024-09-30 16:00:00.000000',5),(172,'2024-10-01 16:00:00.000000',5),(173,'2024-09-27 15:00:00.000000',5),(174,'2024-09-28 15:00:00.000000',5),(175,'2024-09-29 15:00:00.000000',5),(176,'2024-09-30 15:00:00.000000',5),(177,'2024-10-01 15:00:00.000000',5),(178,'2024-09-27 14:00:00.000000',5),(179,'2024-09-27 14:00:00.000000',5),(180,'2024-09-27 14:00:00.000000',6),(181,'2024-09-27 10:00:00.000000',6),(182,'2024-09-28 10:00:00.000000',6),(183,'2024-09-29 10:00:00.000000',6),(184,'2024-09-30 10:00:00.000000',6),(185,'2024-09-27 11:00:00.000000',6),(186,'2024-09-27 15:00:00.000000',6),(187,'2024-09-28 15:00:00.000000',6),(188,'2024-09-29 15:00:00.000000',6),(189,'2024-09-30 15:00:00.000000',6),(190,'2024-09-27 16:00:00.000000',6),(191,'2024-09-27 16:00:00.000000',7),(192,'2024-09-28 16:00:00.000000',7),(193,'2024-09-29 16:00:00.000000',7),(194,'2024-09-30 16:00:00.000000',7),(195,'2024-09-27 17:00:00.000000',7),(196,'2024-09-28 17:00:00.000000',7),(197,'2024-09-29 17:00:00.000000',7),(198,'2024-09-30 17:00:00.000000',7),(199,'2024-09-28 18:00:00.000000',7),(200,'2024-09-29 18:00:00.000000',7),(201,'2024-09-30 18:00:00.000000',7),(202,'2024-10-01 18:00:00.000000',7),(203,'2024-09-28 11:00:00.000000',7),(204,'2024-09-29 11:00:00.000000',7),(205,'2024-09-30 11:00:00.000000',7),(206,'2024-10-01 11:00:00.000000',7),(207,'2024-09-28 11:00:00.000000',8),(208,'2024-09-29 11:00:00.000000',8),(209,'2024-09-30 11:00:00.000000',8),(210,'2024-10-01 11:00:00.000000',8),(211,'2024-10-02 11:00:00.000000',8),(212,'2024-09-28 16:00:00.000000',8),(213,'2024-09-29 16:00:00.000000',8),(214,'2024-09-30 16:00:00.000000',8),(215,'2024-10-01 16:00:00.000000',8),(216,'2024-10-02 16:00:00.000000',8),(217,'2024-09-28 17:00:00.000000',8),(218,'2024-09-29 17:00:00.000000',8),(219,'2024-09-30 17:00:00.000000',8),(220,'2024-10-01 17:00:00.000000',8),(221,'2024-10-02 17:00:00.000000',8),(222,'2024-09-28 18:00:00.000000',8),(223,'2024-09-29 18:00:00.000000',8),(224,'2024-09-30 18:00:00.000000',8),(225,'2024-10-01 18:00:00.000000',8),(226,'2024-10-02 18:00:00.000000',8),(227,'2024-09-28 19:00:00.000000',8),(228,'2024-09-29 19:00:00.000000',8),(229,'2024-09-30 19:00:00.000000',8),(230,'2024-10-01 19:00:00.000000',8),(231,'2024-10-02 19:00:00.000000',8),(232,'2024-09-27 19:00:00.000000',9),(233,'2024-09-28 19:00:00.000000',9),(234,'2024-09-29 19:00:00.000000',9),(235,'2024-09-30 19:00:00.000000',9),(236,'2024-09-27 20:00:00.000000',9),(237,'2024-09-28 20:00:00.000000',9),(238,'2024-09-29 20:00:00.000000',9),(239,'2024-09-30 20:00:00.000000',9),(240,'2024-10-01 20:00:00.000000',9),(241,'2024-09-27 21:00:00.000000',9),(242,'2024-09-28 21:00:00.000000',9),(243,'2024-09-29 21:00:00.000000',9),(244,'2024-09-30 21:00:00.000000',9),(245,'2024-09-27 21:00:00.000000',10),(246,'2024-09-28 21:00:00.000000',10),(247,'2024-09-29 21:00:00.000000',10),(248,'2024-09-30 21:00:00.000000',10),(249,'2024-09-27 22:00:00.000000',10),(250,'2024-09-28 22:00:00.000000',10),(251,'2024-09-29 22:00:00.000000',10),(252,'2024-09-30 22:00:00.000000',10),(253,'2024-09-27 23:00:00.000000',10),(254,'2024-09-28 23:00:00.000000',10),(255,'2024-09-29 23:00:00.000000',10),(256,'2024-09-30 23:00:00.000000',10),(257,'2024-09-27 09:00:00.000000',11),(258,'2024-09-28 09:00:00.000000',11),(259,'2024-09-29 09:00:00.000000',11),(260,'2024-09-30 09:00:00.000000',11),(261,'2024-09-27 09:00:00.000000',11),(262,'2024-09-28 09:00:00.000000',11),(263,'2024-09-29 09:00:00.000000',11),(264,'2024-09-30 09:00:00.000000',11),(265,'2024-09-27 10:00:00.000000',11),(266,'2024-09-28 10:00:00.000000',11),(267,'2024-09-29 10:00:00.000000',11),(268,'2024-09-30 10:00:00.000000',11),(269,'2024-09-27 11:00:00.000000',11),(270,'2024-09-28 11:00:00.000000',11),(271,'2024-09-29 11:00:00.000000',11),(272,'2024-09-30 11:00:00.000000',11),(273,'2024-09-28 11:00:00.000000',12),(274,'2024-09-29 11:00:00.000000',12),(275,'2024-09-30 11:00:00.000000',12),(276,'2024-10-01 11:00:00.000000',12),(277,'2024-09-27 15:00:00.000000',12),(278,'2024-09-28 15:00:00.000000',12),(279,'2024-09-29 15:00:00.000000',12),(280,'2024-09-30 15:00:00.000000',12),(281,'2024-09-27 16:00:00.000000',12),(282,'2024-09-28 16:00:00.000000',12),(283,'2024-09-29 16:00:00.000000',12),(284,'2024-09-30 16:00:00.000000',12),(285,'2024-09-27 16:00:00.000000',13);
/*!40000 ALTER TABLE `termin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 22:33:55
