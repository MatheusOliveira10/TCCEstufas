-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Abr-2020 às 00:39
-- Versão do servidor: 10.4.8-MariaDB
-- versão do PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `mauricio`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `assentos`
--

CREATE TABLE `assentos` (
  `id` int(11) NOT NULL,
  `id_aviao` int(11) NOT NULL,
  `id_passagem` int(11),
  `posicao` varchar(4) NOT NULL,
  `ocupado` char(1) NOT NULL,
  `pcd` char(1) NOT NULL,
  `overbooking` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `aviao`
--

CREATE TABLE `aviao` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cancelamentos`
--

CREATE TABLE `cancelamentos` (
  `id` int(11) NOT NULL,
  `id_passagem` int(11) NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `parcial` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pagamentos`
--

CREATE TABLE `pagamentos` (
  `id` int(11) NOT NULL,
  `id_passagem` int(11) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `passageiros`
--

CREATE TABLE `passageiros` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `PCD` char(1) NOT NULL  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `passagens`
--

CREATE TABLE `passagens` (
  `id` int(11) NOT NULL,
  `id_passageiro` int(11) NOT NULL,
  `preco` float NOT NULL,
  `pago` char(1) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `assentos`
--
ALTER TABLE `assentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_aviao` (`id_aviao`),
  ADD KEY `id_passagem` (`id_passagem`);

--
-- Índices para tabela `aviao`
--
ALTER TABLE `aviao`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `cancelamentos`
--
ALTER TABLE `cancelamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_passagem` (`id_passagem`);

--
-- Índices para tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_passagem` (`id_passagem`);

--
-- Índices para tabela `passageiros`
--
ALTER TABLE `passageiros`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `passagens`
--
ALTER TABLE `passagens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_passageiro` (`id_passageiro`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `assentos`
--
ALTER TABLE `assentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `aviao`
--
ALTER TABLE `aviao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cancelamentos`
--
ALTER TABLE `cancelamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `passageiros`
--
ALTER TABLE `passageiros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `passagens`
--
ALTER TABLE `passagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `assentos`
--
ALTER TABLE `assentos`
  ADD CONSTRAINT `assentos_ibfk_1` FOREIGN KEY (`id_aviao`) REFERENCES `aviao` (`id`),
  ADD CONSTRAINT `assentos_ibfk_2` FOREIGN KEY (`id_passagem`) REFERENCES `passagens` (`id`);

--
-- Limitadores para a tabela `cancelamentos`
--
ALTER TABLE `cancelamentos`
  ADD CONSTRAINT `cancelamentos_ibfk_1` FOREIGN KEY (`id_passagem`) REFERENCES `passagens` (`id`);

--
-- Limitadores para a tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`id_passagem`) REFERENCES `passagens` (`id`);

--
-- Limitadores para a tabela `passagens`
--
ALTER TABLE `passagens`
  ADD CONSTRAINT `passagens_ibfk_1` FOREIGN KEY (`id_passageiro`) REFERENCES `passageiros` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
