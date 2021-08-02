-- MySQL Script generated by MySQL Workbench
-- Sun Aug  1 22:20:23 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tcc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tcc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tcc` ;
USE `tcc` ;

-- -----------------------------------------------------
-- Table `tcc`.`controladores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc`.`controladores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`sensores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc`.`sensores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NULL,
  `porta` INT NULL,
  `tipo_porta` VARCHAR(15) NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `controlador_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sensores_controladores1_idx` (`controlador_id` ASC) VISIBLE,
  CONSTRAINT `fk_sensores_controladores1`
    FOREIGN KEY (`controlador_id`)
    REFERENCES `tcc`.`controladores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`culturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc`.`culturas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(45) NULL,
  `ativa` TINYINT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`leituras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc`.`leituras` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `valor` VARCHAR(15) NULL,
  `created_at` TIMESTAMP NULL,
  `sensor_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_leituras_sensores1_idx` (`sensor_id` ASC) VISIBLE,
  CONSTRAINT `fk_leituras_sensores1`
    FOREIGN KEY (`sensor_id`)
    REFERENCES `tcc`.`sensores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`controladores_culturas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tcc`.`controladores_culturas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `controlador_id` INT UNSIGNED NOT NULL,
  `cultura_id` INT UNSIGNED NOT NULL,
  INDEX `fk_controladores_has_culturas_culturas1_idx` (`cultura_id` ASC) VISIBLE,
  INDEX `fk_controladores_has_culturas_controladores_idx` (`controlador_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_controladores_has_culturas_controladores`
    FOREIGN KEY (`controlador_id`)
    REFERENCES `tcc`.`controladores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_controladores_has_culturas_culturas1`
    FOREIGN KEY (`cultura_id`)
    REFERENCES `tcc`.`culturas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
