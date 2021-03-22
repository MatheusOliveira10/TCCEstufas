-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema heroku_7ff5524695ed144
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema heroku_7ff5524695ed144
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heroku_7ff5524695ed144` ;
USE `heroku_7ff5524695ed144` ;

-- -----------------------------------------------------
-- Table `heroku_7ff5524695ed144`.`controladores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_7ff5524695ed144`.`controladores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `heroku_7ff5524695ed144`.`sensores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_7ff5524695ed144`.`sensores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NULL,
  `porta` INT NULL,
  `tipo_porta` VARCHAR(15) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `controlador_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sensores_controladores1`
    FOREIGN KEY (`controlador_id`)
    REFERENCES `heroku_7ff5524695ed144`.`controladores`(`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `heroku_7ff5524695ed144`.`culturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_7ff5524695ed144`.`culturas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NULL,
  `ativa` TINYINT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `heroku_7ff5524695ed144`.`leituras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_7ff5524695ed144`.`leituras` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `valor` VARCHAR(15) NULL,
  `created_at` TIMESTAMP NULL,
  `sensor_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_leituras_sensores1`
    FOREIGN KEY (`sensor_id`)
    REFERENCES `heroku_7ff5524695ed144`.`sensores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `heroku_7ff5524695ed144`.`controladores_culturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_7ff5524695ed144`.`controladores_culturas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `controlador_id` INT UNSIGNED NOT NULL,
  `cultura_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_controladores_has_culturas_controladores`
    FOREIGN KEY (`controlador_id`)
    REFERENCES `heroku_7ff5524695ed144`.`controladores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_controladores_has_culturas_culturas1`
    FOREIGN KEY (`cultura_id`)
    REFERENCES `heroku_7ff5524695ed144`.`culturas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
